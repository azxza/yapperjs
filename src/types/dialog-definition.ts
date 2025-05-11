import type { CSSProperties, FC, PropsWithChildren, ReactNode } from "react";
import type { YapperDialogContentProps } from "./dialog-content-props";

type BackdropOptions = {
	/**
	 * classname to add to the backdrop
	 */
	backdropClassname?: string;
	/**
	 * style to add to the backdrop
	 */
	backdropStyle?: CSSProperties;    
} | {
    /**
     * backdrop to replace the default backdrop
     */
    backdrop: ReactNode;
};

type ContentOptions<TData, TArgs extends object> = {
    /**
	 * content of the dialog
	 */
    content: FC<YapperDialogContentProps<TData> & TArgs>;
} & (keyof TArgs extends never ? object : {
    /**
     * additional args to send to the content component of the dialog
     */
    args: Omit<TArgs, keyof YapperDialogContentProps<TData>>
});

type PositionerOptions = {
    /**
     * classname to add to the positioner element of the dialog
     */
    positionerClassname?: string;
    /**
     * style to add to the positioner element of the dialog
     */
    postionerStyle?: CSSProperties;
}

type WrapperOptions = {
	/**
	 * optional wrapper for the dialog, will wrap everything (including the backdrop, positioner, and the internal portal)
	 * 
	 * can be used to add contexts to your dialog.
	 */
    wrapper?: FC<PropsWithChildren>;
}

/**
 * definition of a dialog, dictates how it will look and behave.
 */
export type YapperDialogDefinition<TData, TArgs extends object> = BackdropOptions &
    ContentOptions<TData, TArgs> &
    PositionerOptions &
    WrapperOptions;