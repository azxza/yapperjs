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

type ExtractArgsType<T, TData> = T extends FC<YapperDialogContentProps<TData> & infer U>
    ? U extends YapperDialogContentProps<TData>
        ? void  // If U is exactly YapperDialogContentProps<TData>, then no additional args
        : U     // Otherwise, U contains the additional args
    : void;

type ContentOptions<TData, TContent = FC<YapperDialogContentProps<TData>>> = keyof ExtractArgsType<TContent, TData> extends never ? {
    /**
	 * content of the dialog
	 */
    content: TContent;
} : {
    /**
	 * content of the dialog
	 */
    content: TContent;
    /**
     * additional args to send to the content component of the dialog
     */
    args: ExtractArgsType<TContent, TData>;
};

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
export type YapperDialogDefinition<TData, TArgs> = BackdropOptions &
    ContentOptions<TData, FC<YapperDialogContentProps<TData> & TArgs>> &
    PositionerOptions &
    WrapperOptions;