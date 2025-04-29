import { createContext, useContext } from "react";
import { ActiveDialog } from "./types";
export const YapperDialogContext = createContext<ActiveDialog<unknown, object> | null>(null);

export const useYapperDialogContext = () => {
    const context = useContext(YapperDialogContext);
    if (!context) {
        throw new Error("YapperDialogContext is missing, this can happen when useYapperDialogContext is called outside of the yapper dialog components");
    }
    return context;
}
