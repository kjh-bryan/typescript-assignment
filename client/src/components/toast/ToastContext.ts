import { createContext, useContext } from "react";

type ToastContextValue = {
    open: (message: string, count: number) => void;
    close: (id: number) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => useContext(ToastContext);
