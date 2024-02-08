import React from "react";
import { Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <div className="container">
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
};

export default App;
