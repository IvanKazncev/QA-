import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../img/logo.svg";

export const Header: React.FC = () => {
  let navigate = useNavigate();

  return (
    <header className={"flex justify-between items-center"}>
      <img src={logo} alt="Лого" onClick={() => navigate("/")} className="max-h-8 mx-3 my-1 cursor-pointer"/>
      <button
        type="button"
        onClick={() => navigate("/LogIn")}
        className="bg-orange-500 rounded-sm px-3 py-1 mx-3 my-1 text-white"
      >
        Войти
      </button>
    </header>
  );
};
