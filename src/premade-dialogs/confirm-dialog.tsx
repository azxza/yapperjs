import { FC, ReactNode } from "react";
import { DialogContentProps } from "../types";

export const ConfirmDialog: FC<DialogContentProps<boolean> & {
    message: ReactNode,
    title: ReactNode
}> = ({
    cancel,
    resolve,
    message,
    title,
}) => {
    return <div className="yapper__dialog_confirm__root">
        <div className="yapper__dialog_confirm__header">
            <div className="yapper__dialog_confirm__header__title">{title}</div>
            <button className="yapper__dialog_confirm__header__cancel_button" onClick={cancel}>X</button>
        </div>
        <label className="yapper__dialog_confirm__message">{message}</label>
        <div className="yapper__dialog_confirm__footer">
            <button className="yapper__dialog_confirm__submit" onClick={() => resolve(true)}>Yes</button>
            <button className="yapper__dialog_confirm__submit" onClick={() => resolve(false)}>No</button>
        </div>
    </div>
}