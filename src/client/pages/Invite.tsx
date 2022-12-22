import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../hooks/useUserData";

export const Invite = () => {
    const navigate = useNavigate();

  return (
    <div className="p-5 bg-blue-100">
      <label className="flex flex-col items-center p-5 bg-white w-max m-auto">
        Пользователь приглашает Вас в семейную группу.
        <button className="text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg bg-orange-600 my-2" onClick={() => navigate("/registration/step1?isInvited=true")}>
          Принять приглашение
        </button>
      </label>
    </div>
  );
};
