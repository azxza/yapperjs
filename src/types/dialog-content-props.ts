import type { DialogApi } from "./dialog-api";

export type DialogContentProps<T> = {
	resolve(value: T): void;
	reject<U extends Error>(error: U): void;
	cancel(): void;
	api: DialogApi;
}