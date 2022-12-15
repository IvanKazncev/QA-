import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "src/server/routes/api";
// import { TestAPIFoo } from "../components/TestAPIFoo";

export const Auth: React.FC = () => {
  let navigate = useNavigate();

  // const LogIn = async () => {
  //     let response = await fetch("/Registration/CheckEmailCode", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json;charset=utf-8",
  //       },
  //       body: JSON.stringify({  }),
  //     });
  //     let resText = await response.text();
  //     // if (resText === "Email is confirmed") setEmailConfirmed(true);
  //     // else setEmailConfirmed(false);
  //     console.log(resText);  
  // };

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
            className="bg-green-400 text-white rounded px-1 mt-1"
            type="submit"
            onClick={e => {
              e.preventDefault();
              // LogIn();
              navigate("/Main");
            }}
          >
            Войти
          </button>
          <Link to="/Registration">Регистрация</Link>
          <Link to="/Auth/Restore">Забыли пароль?</Link>
        </form>
      </div>
    </main>
  );
};
