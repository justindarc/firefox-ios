/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Foundation
import Shared
import SnapKit

struct DownloadToastUX {
    static let ToastPadding = 15.0
    static let TitleSpacing = 2.0
    static let ToastButtonPadding: CGFloat = 10.0
    static let TitleButtonPadding: CGFloat = 5.0
    static let ToastDelay = DispatchTimeInterval.milliseconds(900)
    static let ToastButtonBorderRadius: CGFloat = 5
    static let ToastButtonBorderWidth: CGFloat = 1
}

private class HighlightableButton: UIButton {
    override var isHighlighted: Bool {
        didSet {
            self.backgroundColor = isHighlighted ? .white : .clear
        }
    }
}

class DownloadToast: UIView {

    fileprivate var dismissed = false
    fileprivate var completionHandler: ((Bool) -> Void)?
    fileprivate lazy var toast: UIView = {
        let toast = UIView()
        toast.backgroundColor = SimpleToastUX.ToastDefaultColor
        return toast
    }()
    fileprivate var animationConstraint: Constraint?
    fileprivate lazy var gestureRecognizer: UITapGestureRecognizer = {
        let gestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(handleTap))
        gestureRecognizer.cancelsTouchesInView = false
        return gestureRecognizer
    }()

    fileprivate let label: UILabel
    fileprivate let button: HighlightableButton

    var progress: Int {
        didSet {
            DispatchQueue.main.async {
                self.label.text = "Downloading (\(self.progress)%)"
            }
        }
    }

    var isDone: Bool {
        didSet {
            guard isDone else {
                return
            }

            DispatchQueue.main.async {
                self.button.setTitle("Close", for: [])
            }
        }
    }

    init(descriptionText: String? = nil, completion:@escaping (_ buttonPressed: Bool) -> Void) {
        self.label = UILabel()
        self.button = HighlightableButton()
        self.progress = 0
        self.isDone = false

        super.init(frame: .zero)

        completionHandler = completion

        self.clipsToBounds = true
        self.addSubview(createView(descriptionText: descriptionText))

        toast.snp.makeConstraints { make in
            make.left.right.height.equalTo(self)
            animationConstraint = make.top.equalTo(self).offset(SimpleToastUX.ToastHeight).constraint
        }
        self.snp.makeConstraints { make in
            make.height.equalTo(SimpleToastUX.ToastHeight)
        }
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    fileprivate func createView(descriptionText: String?) -> UIView {
        label.textColor = UIColor.white
        label.font = SimpleToastUX.ToastFont
        label.lineBreakMode = .byWordWrapping
        label.numberOfLines = 0
        toast.addSubview(label)

        button.layer.cornerRadius = DownloadToastUX.ToastButtonBorderRadius
        button.layer.borderWidth = DownloadToastUX.ToastButtonBorderWidth
        button.layer.borderColor = UIColor.white.cgColor
        button.setTitle("Cancel", for: [])
        button.setTitleColor(self.toast.backgroundColor, for: .highlighted)
        button.titleLabel?.font = SimpleToastUX.ToastFont
        button.titleLabel?.numberOfLines = 1
        button.titleLabel?.lineBreakMode = .byClipping
        button.titleLabel?.adjustsFontSizeToFitWidth = true
        button.titleLabel?.minimumScaleFactor = 0.1

        let recognizer = UITapGestureRecognizer(target: self, action: #selector(buttonPressed))
        button.addGestureRecognizer(recognizer)
        toast.addSubview(button)
        var descriptionLabel: UILabel?

        if let text = descriptionText {
            let textLabel = UILabel()
            textLabel.textColor = UIColor.white
            textLabel.font = SimpleToastUX.ToastFont
            textLabel.text = text
            textLabel.lineBreakMode = .byTruncatingTail
            toast.addSubview(textLabel)
            descriptionLabel = textLabel
        }

        if let description = descriptionLabel {
            label.numberOfLines = 1 // if showing a description we cant wrap to the second line
            label.lineBreakMode = .byClipping
            label.adjustsFontSizeToFitWidth = true
            label.snp.makeConstraints { make in
                make.leading.equalTo(toast).offset(DownloadToastUX.ToastPadding)
                make.top.equalTo(toast).offset(DownloadToastUX.TitleButtonPadding)
                make.trailing.equalTo(button.snp.leading).offset(-DownloadToastUX.TitleButtonPadding)
            }
            description.snp.makeConstraints { make in
                make.leading.equalTo(toast).offset(DownloadToastUX.ToastPadding)
                make.top.equalTo(label.snp.bottom).offset(DownloadToastUX.TitleSpacing)
                make.trailing.equalTo(button.snp.leading).offset(-DownloadToastUX.TitleButtonPadding)
            }
        } else {
            label.snp.makeConstraints { make in
                make.leading.equalTo(toast).offset(DownloadToastUX.ToastPadding)
                make.centerY.equalTo(toast)
                make.trailing.equalTo(button.snp.leading).offset(-DownloadToastUX.TitleButtonPadding)
            }
        }

        button.snp.makeConstraints { make in
            make.trailing.equalTo(toast).offset(-DownloadToastUX.ToastPadding)
            make.centerY.equalTo(toast)
            make.width.equalTo(button.titleLabel!.intrinsicContentSize.width + 2*DownloadToastUX.ToastButtonPadding)
        }

        return toast
    }

    fileprivate func dismiss(_ buttonPressed: Bool) {
        guard dismissed == false else {
            return
        }
        dismissed = true
        superview?.removeGestureRecognizer(gestureRecognizer)

        UIView.animate(withDuration: SimpleToastUX.ToastAnimationDuration, animations: {
            self.animationConstraint?.update(offset: SimpleToastUX.ToastHeight)
            self.layoutIfNeeded()
        }) { finished in
            self.removeFromSuperview()
            if !buttonPressed {
                self.completionHandler?(false)
            }
        }
    }

    func showToast() {
        layoutIfNeeded()
        UIView.animate(withDuration: SimpleToastUX.ToastAnimationDuration) {
            self.animationConstraint?.update(offset: 0)
            self.layoutIfNeeded()
        }
    }

    @objc func buttonPressed(_ gestureRecognizer: UIGestureRecognizer) {
        self.completionHandler?(true)
        self.dismiss(true)
    }

    override func didMoveToSuperview() {
        super.didMoveToSuperview()
        superview?.addGestureRecognizer(gestureRecognizer)
    }

    @objc func handleTap(_ gestureRecognizer: UIGestureRecognizer) {
        dismiss(false)
    }
}
