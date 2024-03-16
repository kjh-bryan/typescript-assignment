import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SettingsProvider } from "./context/settings";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <BrowserRouter>
        <SettingsProvider>
            <App />
        </SettingsProvider>
    </BrowserRouter>
);
