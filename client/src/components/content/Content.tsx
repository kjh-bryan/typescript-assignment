import React, { useContext, useEffect } from "react";
import { SettingsContext } from "../../context/settings";
import { useToast } from "../toast/ToastContext";

export const Content = ({ children }: { children: React.ReactNode }) => {
    const settingsContext = useContext(SettingsContext);

    if (!settingsContext) {
        throw new Error("Settings must be used within a SettingsProvider");
    }
    const { count } = settingsContext;

    const toast = useToast();
    useEffect(() => {
        const eventSource = new EventSource("http://localhost:9000/events");

        eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            toast?.open(eventData.msg, count);
        };
        return () => eventSource.close();
    }, [count]);
    return <div>{children}</div>;
};
