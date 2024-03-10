import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Settings from "./pages/settings/Settings";

const App = () => {
    return (
        <div className="container">
            <Navbar />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </div>
    );
};

export default App;
