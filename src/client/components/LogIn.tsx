import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TestAPIFoo } from "./TestAPIFoo";

export const LogIn: React.FC = () => {
let navigate = useNavigate();

  return (
    <main>
      <div className={"p-5 bg-blue-100"}>
        <form className="flex flex-col max-w-120 items-center mx-auto p-5 bg-white">
          <h1 className="text-2xl">Вход в аккаунт</h1>
          <div className="flex flex-col">
            <span className="text-sm">Почта или телефон</span>
            <input className="border-solid border-gray-400 border rounded px-1" type="text" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Пароль</span>
            <input className="border-solid border-gray-400 border rounded px-1" type="password" name="" id="" />
          </div>
          <button
            className="bg-green-400 text-white rounded px-1"
            type="submit"
            onClick={e => {
              e.preventDefault();
              navigate("../MainPage");
            }}
          >
            Войти
          </button>
          <Link to="/SignIn">Регистрация</Link>
          <a href="#">Забыли пароль?</a>
        </form>
      </div>
    </main>
  );
};
