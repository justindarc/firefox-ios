/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Foundation

extension BrowserViewController {
    func startDownloadWithRequest(_ request: URLRequest, filename: String) {
        let session = URLSession(configuration: URLSessionConfiguration.default, delegate: self, delegateQueue: OperationQueue())
        let task = session.downloadTask(with: request)
        task.resume()

        downloadToast = DownloadToast(descriptionText: filename) { buttonPressed in
            guard buttonPressed else {
                return
            }

            // TODO: cancel download
        }

        self.show(downloadToast: downloadToast!)
    }
}

extension BrowserViewController: URLSessionTaskDelegate {
    func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
        print("Error: \(error.debugDescription)")

        if let downloadToast = self.downloadToast {
            downloadToast.isDone = true
        }
    }
}

extension BrowserViewController: URLSessionDownloadDelegate {
    func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, didWriteData bytesWritten: Int64, totalBytesWritten: Int64, totalBytesExpectedToWrite: Int64) {
        if totalBytesExpectedToWrite > 0 {
            let progress = Float(totalBytesWritten) / Float(totalBytesExpectedToWrite) * 100
            print("Progress: \(progress)")

            if let downloadToast = self.downloadToast {
                downloadToast.progress = Int(progress)
            }
        }
    }
    func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, didFinishDownloadingTo location: URL) {
        print("Finished: \(location)")

        if let downloadToast = self.downloadToast {
            downloadToast.isDone = true
        }

        guard let filename = downloadTask.response?.suggestedFilename, let destination = try? FileManager.default.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false).appendingPathComponent("Downloads").appendingPathComponent(filename) else {
            return
        }

        try? FileManager.default.moveItem(at: location, to: destination)
    }
}
