import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Settings from "./pages/settings/Settings";
import { ToastProvider } from "./components/toast/Toast";
import { Content } from "./components/content/Content";

const App = () => {
    return (
        <div className="container content-container ">
            <Navbar />
            <ToastProvider>
                <Content>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </Content>
            </ToastProvider>
        </div>
    );
};

export default App;
