import { useCallback, useMemo, useState } from "react";
import { ActiveDialog, YapperApi, YapperDialogDefinition } from "./types";
import { createPortal } from "react-dom";
import { Backdrop, Positioner, Root } from "./components";

export type UseYapperDialogOptions = {
	/**
	 * optional: return an html element to be used as the rendering layer of the dialog,
	 * the dialog will be rendered inside it.
	 * 
	 * if ommited, the dialog will be rendererd directly into the <body> element
	 */
    layerGetter?: () => HTMLElement;
};

const defualtOption: UseYapperDialogOptions = {};

/**
 * provides an api object to use dialogs in your function flow
 * 
 * @example
 * ```tsx
 *function MyComponent({submitData}) {
 *	const yapperApi = useYapperDialog();
 * 	return <>
 *  	<button
 *  	onClick={async function () {
 *      	if (!await yapperApi.showDialog({content: ConfirmationDialog})) {
 *         		return;
 *       	}
 *       	await submitData();
 *     	}}>
 *     		Submit
 *   	</button>
 *   	<yapperApi.renderer/>
 * 	</>;
 *}
 * ```
 */
export const useYapperDialog = ({ layerGetter }: UseYapperDialogOptions = defualtOption): YapperApi => {
	const [activeDialog, setActiveDialog] = useState<ActiveDialog<unknown, object>>();
	const showDialog = useCallback(<TData, TArgs extends object>(dialogDefinition: YapperDialogDefinition<TData, TArgs>) => {
		const newActiveDialog = new ActiveDialog<TData, TArgs>(dialogDefinition);
		if (activeDialog) {
			newActiveDialog.parentDialog = activeDialog;
		}
		setActiveDialog(newActiveDialog as ActiveDialog<unknown, object>);
		newActiveDialog.promise.then(() => {
			setActiveDialog(newActiveDialog.parentDialog);
		});
		return newActiveDialog.promise;
	}, [activeDialog, setActiveDialog]);
	const cancelActiveDialog = useCallback(() => {
		if (activeDialog) {
			activeDialog.resolve(null);
			setActiveDialog(activeDialog.parentDialog);
		}
	}, [activeDialog]);

	const dialogApi: YapperApi = useMemo(() => ({
		showDialog,
		cancelActiveDialog,
		renderer() {
            const dialogLayer = layerGetter?.() ?? document.body;
            const renderedDialog = <>
                {activeDialog && <Root activeDialog={activeDialog}>
					<Backdrop/>
					<Positioner>
						{(() => {
                            const additionalArgs = ('args' in activeDialog.definition ? activeDialog.definition.args : {}) as Record<string, unknown>;
							const dialogContent = <activeDialog.definition.content
                                api={dialogApi}
                                resolve={activeDialog.resolve}
                                reject={activeDialog.reject}
                                cancel={cancelActiveDialog}
                                {...additionalArgs}
                            />;
							const Wrapper = activeDialog.definition.wrapper;
							return Wrapper ? <Wrapper>{dialogContent}</Wrapper> : dialogContent;
						})()}
					</Positioner>
				</Root>}
            </>;
            const portal = createPortal(renderedDialog, dialogLayer);
			return portal;
		},
	}), [activeDialog, cancelActiveDialog, layerGetter, showDialog]);
	return dialogApi;
};
