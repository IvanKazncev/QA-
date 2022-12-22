import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URLS } from "../../server/routes/api";
import { useUserData } from "../hooks/useUserData";

// import { TestAPIFoo } from "../components/TestAPIFoo";

export const Auth: React.FC = () => {
  let navigate = useNavigate();
  const [userName, setUserName] = useState(""); // userName здесь - это телефон или почта
  const [password, setPassword] = useState("");
  const userData = useUserData();

  const Login = async () => {
    let response = await fetch(API_URLS.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        tel: userName,
        email: userName.toLowerCase(),
        password: password,
      }),
    });
    if (response.ok) {
      let res = await response.json();
      if (res.login) {
        userData.setState({
          isAuth: true,
          ...res.userData,
          dateOfBirth: new Date(Date.parse(res.userData.dateOfBirth)), 
        });
        navigate("/");
      }
    }
  };

  return (
    <main>
      <div className={"p-5 bg-blue-100"}>
        <form className="flex flex-col max-w-120 items-center mx-auto p-5 bg-white">
          <h1 className="text-2xl">Вход в аккаунт</h1>
          <div className="flex flex-col">
            <span className="text-sm">Почта или телефон</span>
            <input
              className="border-solid border-gray-400 border rounded px-1"
              type="text"
              onChange={e => setUserName(e.target.value)}
              value={userName}
              name="userName"
              id="userName"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Пароль</span>
            <input
              className="border-solid border-gray-400 border rounded px-1"
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              name="password"
              id="password"
            />
          </div>
          <button
            className="bg-green-400 text-white rounded px-1 mt-1"
            type="submit"
            onClick={e => {
              e.preventDefault();
              Login();
              // navigate("/Main");
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
