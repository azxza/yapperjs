import classNames from "classnames";
import { useYapperDialogContext } from "../yapper-dialog.context"

export const Backdrop = () => {
    const activeDialog = useYapperDialogContext();

    return <div className={classNames('yapper__dialog_backdrop', activeDialog.definition.backdropClassname)} style={activeDialog.definition.backdropStyle}/>
}