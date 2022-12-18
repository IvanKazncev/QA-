import React, { useState, useEffect, ChangeEvent, useRef, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { Emailnput } from "../components/Emailnput";
import { TelNumberInput } from "../components/TelNumberInput";
import eye from "../img/eye.svg";
import eyeSlash from "../img/eye-slash.svg";
import { useRegData } from "../hooks/useRegData";
import { API_URLS } from "../../server/routes/api";
import { useUserData } from "../hooks/useUserData";

export const RegStep2: React.FC = () => {
  let navigate = useNavigate();
  const [dataValid, setDataValid] = useState<boolean>(false);
  const [isTelConfirmed, setTelConfirmed] = useState<boolean>(false);
  const [isEmailConfirmed, setEmailConfirmed] = useState<boolean>(false);
  const telNumber = useInput(["isEmpty", "validTelephone"]);
  const email = useInput(["isEmpty", "validEmail"]);
  const password = useInput(["isEmpty", "validPassword"]);
  const confirmPassword = useInput(["isEmpty", "validPassword"]);
  const [isFirstPasVisible, setFirstPasVisible] = useState(false);
  const [isSecondPasVisible, setSecondPasVisible] = useState(false);
  const stepOneRegData = useRegData().regData;
  const userData = useUserData();

  useEffect(() => {
    setDataValid((isTelConfirmed || isEmailConfirmed) && password.isValid && password.value === confirmPassword.value);
  }, [isTelConfirmed, isEmailConfirmed, password.isValid, password.value, confirmPassword.value]);

  const toggleFirstPasVisible = () => {
    setFirstPasVisible(!isFirstPasVisible);
  };
  const toggleSecondPasVisible = () => {
    setSecondPasVisible(!isSecondPasVisible);
  };

  const sendNewUser = async () => {
    let response = await fetch(API_URLS.newUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        name: stepOneRegData.username,
        surname: stepOneRegData.surname,
        tel: isTelConfirmed ? telNumber.value : null,
        email: isEmailConfirmed ? email.value.toLowerCase() : null,
        dateOfBirth: stepOneRegData.dateOfBirth,
        password: password.value,
      }),
    });
    let res = await response.json();
    if (res.login) {
      userData.setState({ isAuth: true, ...res.userData });
      navigate("/");
    }
  };

  // const unMaskTel = (maskedTel: string) => maskedTel.replace(/\+7|\D/g, "");

  // const maskTel = (tel: string) => {
  //   let maskedTel = "+7";
  //   if (tel.length > 0) maskedTel += ` ${tel.substring(0, 3)}`;
  //   if (tel.length > 3) maskedTel += ` ${tel.substring(3, 6)}`;
  //   if (tel.length > 6) maskedTel += ` ${tel.substring(6, 10)}`;
  //   return maskedTel;
  // };

  // const telInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   let val = e.target.value;
  //   if (val !== "+" && val !== "+7") {
  //     val = unMaskTel(val).slice(0, 10);
  //     setName(maskTel(val));
  //   } else setName(val);
  // };

  // const telInputBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Backspace") {
  //     e.preventDefault();
  //     let val = name;
  //     if (val !== "+" && val !== "+7") {
  //       val = unMaskTel(val);
  //       val = val.slice(0, val.length - 1);
  //       setName(maskTel(val));
  //     } else setName(val);
  //   }
  // };

  return (
    <main className="">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl border-2 rounded border-black px-2 pt-2 pb-4 text-center w-full">Регистрация</h1>
        <form
          className="flex flex-col max-w-120"
          action=""
          onKeyDown={e => {
            if (e.key == "Enter" && dataValid) {
              e.preventDefault();
              navigate("/MainPage");
            }
          }}
        >
          <span className="text-gray-500 text-center">Введите номер телефона</span>
          <TelNumberInput telNumber={telNumber} setTelConfirmed={setTelConfirmed} isTelConfirmed={isTelConfirmed} />

          <span className="text-gray-500 text-center">Или</span>
          <span className="text-gray-500 text-center">E-mail</span>
          <Emailnput email={email} setEmailConfirmed={setEmailConfirmed} isEmailConfirmed={isEmailConfirmed} />

          <label className="text-gray-500 text-center flex flex-col relative">
            Придумайте пароль
            <input
              value={password.value}
              onChange={password.onChange}
              className={
                "border-solid border-gray-400 border rounded px-1 " +
                (password.isValid ? "bg-green-200" : "bg-blue-100")
              }
              type={isFirstPasVisible ? "text" : "password"}
              placeholder="Придумайте пароль"
            />
            <img
              src={isFirstPasVisible ? eyeSlash : eye}
              onClick={toggleFirstPasVisible}
              className="absolute top-[29px] right-2"
            />
            <span className="text-gray-500 text-xs text-left">
              {
                "Пароль должен состоять из букв латинского алфавита (A-z), арабских цифр (0-9) и специальных символов: ( . , : ; ? ! * + % - < > @ [ ] { } / \\ _ {} $ # )"
              }
            </span>
          </label>
          <label className="text-gray-500 text-center flex flex-col relative">
            Повторите пароль
            <input
              value={confirmPassword.value}
              onChange={confirmPassword.onChange}
              className={
                "border-solid border-gray-400 border rounded px-1 " +
                (password.value === confirmPassword.value && confirmPassword.isValid ? "bg-green-200" : "bg-blue-100")
              }
              type={isSecondPasVisible ? "text" : "password"}
              placeholder="Повторите пароль"
            />
            <img
              src={isSecondPasVisible ? eyeSlash : eye}
              onClick={toggleSecondPasVisible}
              className="absolute top-[29px] right-2"
            />
          </label>
          <div className="flex gap-5 self-center my-5">
            <button
              onClick={e => {
                e.preventDefault();
                navigate("/Registration/Step1");
              }}
              className="border-solid border-gray-400 border text-sm leading-6 font-medium py-2 px-3 rounded-lg w-28"
            >
              Назад
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                sendNewUser();
              }}
              className={
                "text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg w-28 " +
                (dataValid ? "bg-orange-600" : "bg-gray-500")
              }
              disabled={!dataValid}
            >
              Далее
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
