import { useCallback, useState } from "react";
import { ActiveDialog, DialogApi, DialogDefinition } from "./types";
import { createPortal } from "react-dom";
import { Backdrop, Positioner, Root } from "./components";
import { PromptDialog } from "./premade-dialogs/prompt-dialog";
import { ConfirmDialog } from "./premade-dialogs/confirm-dialog";
import React from "react";

export type UseYapperDialogOptions = {
    layerGetter?: () => HTMLElement;
};

export const useYapperDialog = ({ layerGetter }: UseYapperDialogOptions): DialogApi => {
	const [activeDialog, setActiveDialog] = useState<ActiveDialog<unknown, object>>();
	const showDialog = useCallback(<TData, TArgs extends object>(dialogDefinition: DialogDefinition<TData, TArgs>) => {
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

	const prompt = useCallback((message: React.ReactNode, title: React.ReactNode = '') => {
		return showDialog({
            content: PromptDialog,
            args: { message, title },
		});
	}, [showDialog]);

	const confirm = useCallback((message: React.ReactNode, title: React.ReactNode = '') => {
		return showDialog({
            content: ConfirmDialog,
            args: {message, title},
		});
	}, [showDialog]);

	const dialogApi: DialogApi = {
		prompt,
		confirm,
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
	};
	return dialogApi;
};
