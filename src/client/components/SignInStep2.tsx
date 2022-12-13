import React, { useState, useEffect, ChangeEvent, useRef, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";
import useInput, {IUseInput} from "../hooks/useInput";
import { TelNumberInput } from "./TelNumberInput";
// import useTelephoneInput from "../hooks/useTelephoneInput";

export const SignInStep2: React.FC = () => {
  let navigate = useNavigate();
  const [dataValid, setDataValid] = useState<boolean>(false);
  const [isTelConfirmed, setTelConfirmed] = useState<boolean>(false);
  const telNumber: IUseInput = useInput(["isEmpty", "validTelephone"]);
  const email = useInput(["isEmpty", "validEmail"]);
  const password = useInput(["isEmpty", "validPassword"]);
  const confirmPassword = useInput(["isEmpty", "validPassword"]);

  useEffect(() => {
    setDataValid((isTelConfirmed || email.isValid) && password.isValid && password.value === confirmPassword.value);
  }, [isTelConfirmed, email.isValid, password.isValid, password.value, confirmPassword.value]);

  // const [name, setName] = useState<string>("");

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

  // const telInputRef = useRef<HTMLInputElement>(null);
  // const telCodeRef = useRef<HTMLInputElement>(null);
  // const requestTelCode = () => {
  //   if (telInputRef.current) telInputRef.current.hidden = !telInputRef.current.hidden;
  //   if (telCodeRef.current) telCodeRef.current.hidden = !telCodeRef.current.hidden;
  //   // if (telInputRef.current.className != null) telInputRef.current.className = telInputRef.current.className + " hidden"
  // };

  // const telInput = useTelephoneInput();

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
          <TelNumberInput telNumber={telNumber} setTelConfirmed={setTelConfirmed} isTelConfirmed={isTelConfirmed}/>

          <span className="text-gray-500 text-center">Или</span>
          <span className="text-gray-500 text-center">E-mail</span>
          <input
            value={email.value}
            onChange={email.onChange}
            className={
              "border-solid border-gray-400 border rounded px-1 " + (email.isValid ? "bg-green-200" : "bg-blue-100")
            }
            type="email"
            placeholder="E-mail"
          />
          <span className="text-gray-500 text-center">Придумайте пароль</span>
          <input
            value={password.value}
            onChange={password.onChange}
            className={
              "border-solid border-gray-400 border rounded px-1 " + (password.isValid ? "bg-green-200" : "bg-blue-100")
            }
            type="password"
            placeholder="Придумайте пароль"
          />
          <span className="text-gray-500 text-center">Повторите пароль</span>
          <input
            value={confirmPassword.value}
            onChange={confirmPassword.onChange}
            className={
              "border-solid border-gray-400 border rounded px-1 " +
              (password.value === confirmPassword.value && confirmPassword.isValid ? "bg-green-200" : "bg-blue-100")
            }
            type="password"
            placeholder="Повторите пароль"
          />

          <div className="flex gap-5 self-center my-5">
            <button
              onClick={e => {
                e.preventDefault();
                navigate("/SignIn");
              }}
              className="border-solid border-gray-400 border text-sm leading-6 font-medium py-2 px-3 rounded-lg w-28"
            >
              Назад
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                if (dataValid) navigate("/MainPage");
              }}
              className={
                "text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg w-28 " +
                (dataValid ? "bg-orange-600" : "bg-gray-500")
              }
            >
              Далее
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
