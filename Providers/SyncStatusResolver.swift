/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Foundation
import Sync
import XCGLogger
import Deferred
import Shared
import Storage

fileprivate struct Strings {}

// Syncing
extension Strings {
    public static let FirefoxSyncOfflineTitle = NSLocalizedString("SyncState.Offline.Title", value: "Sync is offline", comment: "Title for Sync status message when Sync failed due to being offline")
    public static let FirefoxSyncPartialTitle = NSLocalizedString("SyncState.Partial.Title", value: "Sync is experiencing issues syncing %@", comment: "Title for Sync status message when a component of Sync failed to complete, where %@ represents the name of the component, i.e. Sync is experiencing issues syncing Bookmarks")

    public static func localizedStringForSyncComponent(_ componentName: String) -> String? {
        switch componentName {
        case "bookmarks":
            return NSLocalizedString("SyncState.Bookmark.Title", value: "Bookmarks", comment: "The Bookmark sync component, used in SyncState.Partial.Title")
        case "clients":
            return NSLocalizedString("SyncState.Clients.Title", value: "Remote Clients", comment: "The Remote Clients sync component, used in SyncState.Partial.Title")
        case "tabs":
            return NSLocalizedString("SyncState.Tabs.Title", value: "Tabs", comment: "The Tabs sync component, used in SyncState.Partial.Title")
        case "logins":
            return NSLocalizedString("SyncState.Logins.Title", value: "Logins", comment: "The Logins sync component, used in SyncState.Partial.Title")
        case "history":
            return NSLocalizedString("SyncState.History.Title", value: "History", comment: "The History sync component, used in SyncState.Partial.Title")
        default: return nil
        }
    }
}

public enum SyncDisplayState {
    case inProgress
    case good
    case bad(message: String?)
    case warning(message: String)

    func asObject() -> [String: String]? {
        switch self {
        case .bad(let msg):
            guard let message = msg else {
                return ["state": "Error"]
            }
            return ["state": "Error",
                    "message": message]
        case .warning(let message):
            return ["state": "Warning",
                    "message": message]
        default:
            break
        }
        return nil
    }
}

public func ==(a: SyncDisplayState, b: SyncDisplayState) -> Bool {
    switch (a, b) {
    case (.inProgress, .inProgress):
        return true
    case (.good, .good):
        return true
    case (.bad(let a), .bad(let b)) where a == b:
        return true
    case (.warning(let a), .warning(let b)) where a == b:
        return true
    default:
        return false
    }
}

private let log = Logger.syncLogger

/*
 * Translates the fine-grained SyncStatuses of each sync engine into a more coarse-grained
 * display-oriented state for displaying warnings/errors to the user.
 */
public struct SyncStatusResolver {

    let engineResults: Maybe<EngineResults>

    public func resolveResults() -> SyncDisplayState {
        guard let results = engineResults.successValue else {
            switch engineResults.failureValue {
            case _ as BookmarksMergeError, _ as BufferInvalidError:
                return SyncDisplayState.warning(message: String(format: Strings.FirefoxSyncPartialTitle, Strings.localizedStringForSyncComponent("bookmarks") ?? ""))
            default:
                return SyncDisplayState.bad(message: nil)
            }
        }

        // Run through the engine results and produce a relevant display status for each one
        let displayStates: [SyncDisplayState] = results.map { (engineIdentifier, syncStatus) in
            log.debug("Sync status for \(engineIdentifier): \(syncStatus)")

            // Explicitly call out each of the enum cases to let us lean on the compiler when
            // we add new error states
            switch syncStatus {
            case .notStarted(let reason):
                switch reason {
                case .offline:
                    return .bad(message: Strings.FirefoxSyncOfflineTitle)
                case .noAccount:
                    return .warning(message: Strings.FirefoxSyncOfflineTitle)
                case .backoff(_):
                    return .good
                case .engineRemotelyNotEnabled(_):
                    return .good
                case .engineFormatOutdated(_):
                    return .good
                case .engineFormatTooNew(_):
                    return .good
                case .storageFormatOutdated(_):
                    return .good
                case .storageFormatTooNew(_):
                    return .good
                case .stateMachineNotReady:
                    return .good
                case .redLight:
                    return .good
                case .unknown:
                    return .good
                }
            case .completed:
                return .good
            case .partial:
                return .good
            }
        }

        // TODO: Instead of finding the worst offender in a list of statuses, we should better surface
        // what might have happened with a particular engine when syncing.
        let aggregate: SyncDisplayState = displayStates.reduce(.good) { carried, displayState in
            switch displayState {

            case .bad(_):
                return displayState

            case .warning(_):
                // If the state we're carrying is worse than the stale one, keep passing
                // along the worst one
                switch carried {
                case .bad(_):
                    return carried
                default:
                    return displayState
                }
            default:
                // This one is good so just pass on what was being carried
                return carried
            }
        }

        log.debug("Resolved sync display state: \(aggregate)")
        return aggregate
    }
}
