import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";

import Navigation from "./components/Navigation/Navigation";

import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
