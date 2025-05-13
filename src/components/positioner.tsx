import React from "react";
import classNames from "classnames";
import { PropsWithChildren } from "react";
import { useYapperDialogContext } from "../yapper-dialog.context";

export const Positioner = ({children}: PropsWithChildren) => {
    const activeDialog = useYapperDialogContext();
    return <div className={classNames(
            'yapper__dialog_positioner',
            activeDialog.definition.positionerClassname
        )} style={activeDialog.definition.postionerStyle}>
        {children}
    </div>
}