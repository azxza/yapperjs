import type { DialogDefinition } from "./dialog-definition";

export class ActiveDialog<TData, TArgs extends object> {
    private _resolve: (value?: TData | undefined) => void = () => {};
    private _reject: <U extends Error>(error: U) => void = () => {};
	public get resolve(): (value?: TData | undefined) => void {
        return this._resolve;
    };
	public get reject(): <U extends Error>(error: U) => void {
        return this._reject;
    };
	public readonly promise: Promise<TData | undefined>;
	public parentDialog?: ActiveDialog<unknown, object>;
	constructor(public readonly definition: DialogDefinition<TData, TArgs>) {
		this.promise = new Promise<TData | undefined>((resolve, reject) => {
			this._resolve = (value) => resolve(value);
            this._reject = (error) => reject(error);
		});
	}
}