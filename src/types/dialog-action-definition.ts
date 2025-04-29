import type { ReactNode } from "react";
import type { DialogApi } from "./dialog-api";

export type DialogActionDefinition<T> = {
    do: (resolveDialog: (value: T | undefined) => void, api: DialogApi) => void;
    triggerContent: ReactNode;
    triggerClassname?: string;
};