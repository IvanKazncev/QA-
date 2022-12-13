import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Landing } from "../components/Landing";
import { SignIn } from "../components/SignIn";
import { LogIn } from "../components/LogIn";
import { SignInStep2 } from "../components/SignInStep2";
import { useAppContext } from "../Context";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "../components/MainPage";

const Main = () => {
  const { name, setName } = useAppContext();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/MainPage" element={<MainPage />}></Route>
        <Route path="/LogIn" element={<LogIn />}></Route>
        <Route path="/SignIn" element={<SignIn />}></Route>
        <Route path="/SignInStep2" element={<SignInStep2 />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default Main;
