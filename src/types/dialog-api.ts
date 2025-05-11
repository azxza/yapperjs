import { YapperDialogDefinition } from "./dialog-definition";

export type YapperApi = {
	/**
	 * sets a new active dialog for this api object
	 * @param {YapperDialogDefinition<TData, TArgs>} dialog the definition of the dialog that will be shown
	 * @returns promise that resolves or rejects according to the actions in the dialog
	 */
    showDialog<TData, TArgs extends object>(dialog: YapperDialogDefinition<TData, TArgs>): Promise<TData | undefined>;
	/**
	 * cancels the current active dialog of this api object, resolving it into undefined.
	 */
	cancelActiveDialog: () => void;
	/**
	 * renders the currently active dialog
	 */
	readonly renderer: React.FC;
}