import React from "react";
import { ActiveDialog } from "../types";
import { PropsWithChildren } from "react";
import { YapperDialogContext } from "../yapper-dialog.context";

type Props = PropsWithChildren<{
    activeDialog: ActiveDialog<unknown, object>
}>;
export const Root = (props: Props) => {
    return <YapperDialogContext.Provider value={props.activeDialog}>
            {props.children}
    </YapperDialogContext.Provider>
}