import React, { useContext } from "react";
import "./Settings.css";
import { SettingsContext } from "../../context/settings";

const Settings = () => {
    const settingsContext = useContext(SettingsContext);

    if (!settingsContext) {
        throw new Error("Settings must be used within a SettingsProvider");
    }

    const { count, setCount, position, setPosition, time, setTime } =
        settingsContext;

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPosition(+event.target.value);
    };
    return (
        <div className="settings-container">
            <div className="settings-dialog-container">
                <div className="settings-dialog">
                    <div className="settings-dialog-title">
                        <p>Notification count</p>
                    </div>
                    <div className="settings-dialog-input">
                        <input
                            type="number"
                            value={count}
                            onChange={(event) => setCount(+event.target.value)}
                        ></input>
                    </div>
                </div>

                <div className="settings-dialog">
                    <div className="settings-dialog-title">
                        <p>Notification position</p>
                    </div>
                    <div className="settings-dialog-input">
                        <div className="radio-group">
                            <input
                                type="radio"
                                id="position1"
                                name="position"
                                value={1}
                                checked={position === 1}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="position1">Position 1</label>
                            <input
                                type="radio"
                                id="position2"
                                name="position"
                                value={2}
                                checked={position === 2}
                                onChange={handleOptionChange}
                            />

                            <label htmlFor="position2">Position 2</label>
                            <input
                                type="radio"
                                id="position3"
                                name="position"
                                value={3}
                                checked={position === 3}
                                onChange={handleOptionChange}
                            />

                            <label htmlFor="position3">Position 3</label>
                            <input
                                type="radio"
                                id="position4"
                                name="position"
                                value={4}
                                checked={position === 4}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="position4">Position 4</label>
                        </div>
                    </div>
                </div>
                <div className="settings-dialog">
                    <div className="settings-dialog-title">
                        <p>Notification disappear time</p>
                    </div>
                    <div className="settings-dialog-input">
                        <input
                            type="number"
                            value={time}
                            onChange={(event) => setTime(+event.target.value)}
                        ></input>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
