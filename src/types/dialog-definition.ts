import type { CSSProperties, FC, PropsWithChildren } from "react";
import type { DialogContentProps } from "./dialog-content-props";

/**
 * definition of a dialog, dictates how it will look and behave.
 */
export type DialogDefinition<TData, TArgs extends object> = {
	/**
	 * content of the dialog
	 */
    content: FC<DialogContentProps<TData> & TArgs>;
	/**
	 * optional wrapper for the dialog, will wrap everything (including the backdrop, positioner, and the internal portal)
	 * 
	 * can be used to add contexts to your dialog.
	 */
    wrapper?: FC<PropsWithChildren>;
	/**
	 * classname to add to the backdrop
	 */
	backdropClassname?: string;
	/**
	 * style to add to the backdrop
	 */
	backdropStyle?: CSSProperties;
    /**
     * classname to add to the positioner element of the dialog
     */
    positionerClassname?: string;
    /**
     * style to add to the positioner element of the dialog
     */
    postionerStyle?: CSSProperties;
} & (keyof TArgs extends never ? object : {
    /**
     * additional args to send to the content component of the dialog
     */
    args: Omit<TArgs, keyof DialogContentProps<TData>>
});