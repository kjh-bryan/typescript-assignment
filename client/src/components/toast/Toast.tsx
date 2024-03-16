import { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./Toast.css";
import { ToastContext } from "./ToastContext";
import { SettingsContext } from "../../context/settings";

function useTimeout(callback: () => void, isHovered: boolean) {
    const settingsContext = useContext(SettingsContext);

    const savedCallback = useRef(callback);
    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    if (!settingsContext) {
        throw new Error("Settings must be used within a SettingsProvider");
    }
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!isHovered) {
            timeoutId.current = setTimeout(
                () => savedCallback.current(),
                settingsContext.time * 1000
            );
        } else {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
                timeoutId.current = null;
            }
        }
        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
                timeoutId.current = null;
            }
        };
    }, [isHovered, settingsContext.time]);
}

type ToastProperties = {
    message: string;
    close: () => void;
    position: string;
};

export function Toast({ message, close, position }: ToastProperties) {
    const [isHovered, setIsHovered] = useState(false);
    useTimeout(() => {
        if (!isHovered) {
            close();
        }
    }, isHovered);
    return (
        <div
            className={`toast toast-${position}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <p>{message}</p>
            <button className="close-button" onClick={close}>
                X
            </button>
        </div>
    );
}

type ToastType = {
    message: string;
    id: number;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastType[]>([]);
    const [toastCount, setToastCount] = useState(0);

    const settingsContext = useContext(SettingsContext);

    if (!settingsContext) {
        throw new Error("Settings must be used within a SettingsProvider");
    }
    useEffect(() => {
        setToastCount(toasts.length);
    }, [toasts]);
    const openToast = (message: string, count: number) => {
        const newToast = {
            id: Date.now(),
            message: message,
        };
        setToastCount((prevCount) => {
            if (prevCount >= count) {
                setToasts((previousToasts) => [
                    ...previousToasts.slice(
                        previousToasts.length - count + 1,
                        previousToasts.length
                    ),
                    newToast,
                ]);
                return prevCount;
            } else {
                setToasts((previousToasts) => [...previousToasts, newToast]);
                return prevCount + 1;
            }
        });
    };

    const closeToast = (id: number) => {
        setToasts((previousToasts) =>
            previousToasts.filter((toast) => toast.id !== id)
        );
    };

    const contextValue = useMemo(() => {
        return {
            open: openToast,
            close: closeToast,
        };
    }, [toastCount, toasts]);

    return (
        <>
            <ToastContext.Provider value={contextValue}>
                <div className="content">
                    {children}
                    <div
                        className={`toast-container position-${settingsContext.position}`}
                    >
                        {toasts &&
                            toasts.map((toast) => {
                                return (
                                    <Toast
                                        position={
                                            settingsContext.position === 2 ||
                                            settingsContext.position === 4
                                                ? "right"
                                                : "left"
                                        }
                                        key={toast.id}
                                        message={toast.message}
                                        close={() => closeToast(toast.id)}
                                    />
                                );
                            })}
                    </div>
                </div>
            </ToastContext.Provider>
        </>
    );
}
