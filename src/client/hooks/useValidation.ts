import { useEffect, useState } from "react";

export type validations = Array<"isEmpty" | "validPassword" | "validUserName" | "validEmail" | "validTelephone">;

const useValidation = (value: any, validations: validations) => {
  const [isEmpty, setEmpty] = useState(false);
  const [isPassValid, setPassValid] = useState(false);
  const [isNickname, setNickname] = useState(false);
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    let valid = true;
    for (const key in validations) {
      switch (validations[key]) {
        case "isEmpty": {
          if (value) setEmpty(false);
          else {
            setEmpty(true);
            valid = false;
          }
          break;
        }
        case "validPassword": {
            // const regExp = /^.{1,20}$/; // только для ускорения тестов
            // const regExp = /^(?=.*[\d])(?=.*[A-Za-z])(?=.*[.,:;?!*+%\-<>@[\]{}/\\_{}$#]).{8}$/;
            const regExp = /^(?=.*?[\d])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[.,:;?!*+%\-<>@[\]{}/\\_{}$#])[\dA-Za-z.,:;?!*+%\-<>@[\]{}/\\_{}$#]{8,14}$/;
          if (regExp.test(value)) setPassValid(true);
          else {
            setPassValid(false);
            valid = false;
          }
          break;
        }
        case "validUserName": {
          // const regExp = /^.{1,20}$/; // только для ускорения тестов
          const regExp = /^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z-]{0,29}$/; // от 1 до 20 символов от латиницы и кириллицы
          if (regExp.test(value)) setNickname(true);
          else {
            setNickname(false);
            valid = false;
          }
          break;
        }
        case "validEmail": {
            // const regExp = /^.{1,20}$/; // только для ускорения тестов
          const regExp = /^.{1,}@.{1,}\..{1,}$/;
          if (regExp.test(value)) setValidEmail(true);
          else {
            setValidEmail(false);
            valid = false;
          }
          break;
        }
        case "validTelephone": {
            // const regExp = /^.{1,20}$/; // только для ускорения тестов
            const regExp = /^[+][7]\d{10}$/;
          if (regExp.test(value)) setValidEmail(true);
          else {
            setValidEmail(false);
            valid = false;
          }
          break;
        }

        default:
          break;
      }
      setValid(valid);
    }
  }, [value, validations]);

  return {
    isValid,
  };
};

export default useValidation;
