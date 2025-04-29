import { effect, signal } from "@maverick-js/signals";
import type { DialogDefinition } from "./dialog-definition";

export class ActiveDialog<TData, TArgs extends object> {
	public readonly resolve: (value?: TData | undefined) => void;
	public readonly reject: <U extends Error>(error: U) => void;
	public readonly promise: Promise<TData | undefined>;
	public parentDialog?: ActiveDialog<unknown, object>;
	constructor(public readonly definition: DialogDefinition<TData, TArgs>) {
		const resolveSignal = signal<TData | undefined>(undefined);
		const rejectSignal = signal<Error | undefined>(undefined);
		this.resolve = (value?: TData) => {
			resolveSignal.set(value);
		};
		this.reject = (error: Error) => {
			rejectSignal.set(error);
		};
		this.promise = new Promise<TData | undefined>((resolve, reject) => {
			let initialResolve = true;
			let initialReject = true;
			effect(() => {
				const value = resolveSignal();
				if (initialResolve) {
					initialResolve = false;
					return;
				}
				resolve(value);
			});
			effect(() => {
				const error = rejectSignal();
				if (initialReject) {
					initialReject = false;
					return;
				}
				reject(error);
			});
		});
	}
}