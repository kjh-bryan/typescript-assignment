import { createContext, useContext, useMemo, useState } from "react";

type SettingsContextValue = {
    setCount: (count: number) => void;
    count: number;
    setPosition: (position: number) => void;
    position: number;
    setTime: (time: number) => void;
    time: number;
};

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export const useSettings = () => useContext(SettingsContext);

import { useEffect } from "react";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [notificationCount, setNotificationCount] = useState(1);
    const [notificationPosition, setNotificationPosition] = useState(1);
    const [notificationDisappearTime, setNotificationDisappearTime] =
        useState(1);

    const updateNotificationCount = (count: number) => {
        setNotificationCount(count);
    };

    const updateNotificationPosition = (position: number) => {
        if (position >= 1 && position <= 4) setNotificationPosition(position);
    };
    const updateNotificationDisappearTime = (time: number) => {
        setNotificationDisappearTime(time);
    };

    useEffect(() => {
        updateNotificationCount(notificationCount);
        updateNotificationPosition(notificationPosition);
        updateNotificationDisappearTime(notificationDisappearTime);
    }, [notificationCount, notificationPosition, notificationDisappearTime]);

    const contextValue = useMemo(
        () => ({
            setCount: updateNotificationCount,
            count: notificationCount,
            setPosition: updateNotificationPosition,
            position: notificationPosition,
            setTime: updateNotificationDisappearTime,
            time: notificationDisappearTime,
        }),
        [notificationCount, notificationPosition, notificationDisappearTime]
    );

    return (
        <>
            <SettingsContext.Provider value={contextValue}>
                {children}
            </SettingsContext.Provider>
        </>
    );
}
