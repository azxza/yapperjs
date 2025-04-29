import { FC, ReactNode, useState } from "react";
import { DialogContentProps } from "../types";

export const PromptDialog: FC<DialogContentProps<string> & {
    message: ReactNode,
    title: ReactNode
}> = ({
    resolve,
    cancel,
    message,
    title
}) => {
    const [userInput, setUserInput] = useState('');
    return <div className="yapper__dialog_prompt__root">
        <div className="yapper__dialog_prompt__header">
            <div className="yapper__dialog_prompt__header__title">{title}</div>
            <button className="yapper__dialog_prompt__header__cancel_button" onClick={cancel}>X</button>
        </div>
        <label className="yapper__dialog_prompt__message">{message}</label>
        <input className="yapper__dialog_prompt__input" value={userInput} onChange={(e) => setUserInput(e.target.value)}/>
        <div className="yapper__dialog_prompt__footer">
            <button className="yapper__dialog_prompt__submit" onClick={() => resolve(userInput)}>Submit</button>
        </div>
    </div>
}