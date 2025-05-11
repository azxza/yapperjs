import type { YapperApi } from "./dialog-api";

/**
 * props of a yapper dialog content
 * @param T return type of the dialog
 */
export type YapperDialogContentProps<T> = {
	/**
	 * resolves the dialogs promise, making it return value
	 * @param value the value that the dialog resolves into
	 */
	resolve(value: T): void;
	/**
	 * rejects the dialogs promise, making it throw error
	 * @param error the error that the dialog rejects into
	 */
	reject<U extends Error>(error: U): void;
	/**
	 * cancels the dialog, making its promise resolve into undefined
	 */
	cancel(): void;
	/**
	 * the api object that was used for showing the dialog, can be used to show "child dialogs"
	 */
	api: YapperApi;
}