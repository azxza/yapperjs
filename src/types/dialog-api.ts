import { DialogDefinition } from "./dialog-definition";

export type DialogApi = {
    showDialog: <TData, TArgs extends object>(newDialog: DialogDefinition<TData, TArgs>) => Promise<TData | undefined>;
	prompt: (message: React.ReactNode, title?: React.ReactNode) => Promise<string | undefined>;
	confirm: (message: React.ReactNode, title?: React.ReactNode) => Promise<boolean | undefined>;
    cancelActiveDialog: () => void;
	readonly renderer: React.FC;
}

export type ContextualDialogApi = Omit<DialogApi, 'renderer'>;