import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useInput from "../hooks/useInput";
import { DateOfBirthInput } from "./DateOfBirthInput";
import { useRegData } from "../hooks/useRegData";
import { isAdult } from "./functions/isAdult";

export interface IRegStep1 {
  nextStep: () => void;
}

export const RegStep1: React.FC<IRegStep1> = ({ nextStep }) => {
  let navigate = useNavigate();
  const [dataValid, setDataValid] = useState<boolean>(false);
  const userName = useInput(["isEmpty", "validUserName"]);
  const userSurname = useInput(["isEmpty", "validUserName"]);
  const [userBirthData, setUserBirthData] = useState<Date>(new Date());
  const [isInvited] = useSearchParams();
  const needResponsibility = isInvited.get("isInvitedForParent") === "true";
  const [isResponsible, setResponsible] = useState(false);

  useEffect(() => {
    setDataValid(userName.isValid && userSurname.isValid && (!needResponsibility || (isResponsible && isAdult(userBirthData))));
  }, [userName.isValid, userSurname.isValid, needResponsibility, isResponsible, userBirthData]);

  const regData = useRegData();

  const setRegData = () =>
    regData.setState({
      username: userName.value,
      surname: userSurname.value,
      dateOfBirth: userBirthData,
    });

  const handleClickNext = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (dataValid) {
      setRegData();
      nextStep();
    }
  };

  return (
    <main className="">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl border-2 rounded border-black px-2 pt-2 pb-4 text-center w-full">Регистрация</h1>
        <p className="text-gray-500 text-center">Введите имя и фамилию</p>
        <form
          className="flex flex-col max-w-120"
          action=""
          onKeyDown={e => {
            if (e.key == "Enter") {
              handleClickNext;
            }
          }}
        >
          <input
            value={userName.value}
            onChange={userName.onChange}
            // onBlur={userName.onBlur}
            className="border-solid border-gray-400 border rounded px-1 bg-blue-100 mb-2"
            type="text"
            placeholder="Имя"
          />
          <input
            value={userSurname.value}
            onChange={userSurname.onChange}
            // onBlur={userSurname.onBlur}
            className="border-solid border-gray-400 border rounded px-1 bg-blue-100 mb-2"
            type="text"
            placeholder="Фамилия"
          />
          <span className="text-gray-500 text-center mb-2">Дата рождения</span>
          <DateOfBirthInput setUserBirthData={setUserBirthData} />
          {needResponsibility && (
            <label className="text-center mt-2">
              <input
                className="mx-1"
                type="checkbox"
                checked={isResponsible}
                onChange={() => setResponsible(!isResponsible)}
              />
              Беру всю ответственность на себя
            </label>
          )}
          <div className="flex gap-5 self-center my-5">
            <button
              onClick={e => {
                e.preventDefault();
                navigate("/");
              }}
              className="border-solid border-gray-400 border text-sm leading-6 font-medium py-2 px-3 rounded-lg w-28"
            >
              Назад
            </button>
            <button
              onClick={handleClickNext}
              className={
                "text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg w-28 bg-orange-600 disabled:bg-gray-500"
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
