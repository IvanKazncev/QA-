import React from "react";
import Main from "./pages/Main";
import { ContextWrapper } from "./Context";
import { Route, Routes, Navigate } from "react-router-dom";
import { Landing } from "./components/Landing";
import { RegStep1 } from "./pages/RegStep1";
import { RegStep2 } from "./pages/RegStep2";
import { Header } from "./components/Header";
import { Auth } from "./pages/Auth";
import { Restore } from "./pages/Restore";
import { useUserData } from "./hooks/useUserData";

export const App = () => {
  let isUserAuth = useUserData().isAuth;
  return (
    <ContextWrapper>
      <Header />
      <Routes>
        <Route path="/" element={isUserAuth ? <Main /> : <Landing />}></Route>
        <Route path="/Main" element={<Main />}></Route>
        <Route path="/Auth" element={<Auth />}></Route>
        <Route path="/Auth/Restore" element={<Restore />}></Route>
        <Route path="/Registration" element={<Navigate to={"/Registration/Step1"} />}></Route>
        <Route path="/Registration/Step1" element={<RegStep1 />}></Route>
        <Route path="/Registration/Step2" element={<RegStep2 />}></Route>
      </Routes>
    </ContextWrapper>
  );
};

export default App;
