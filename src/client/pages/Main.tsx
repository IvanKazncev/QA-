import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { useAppContext } from "../Context";
import { ModalSendInvite } from "../components/ModalSendInvite";
import { useUserData } from "../hooks/useUserData";

const Main = () => {
  // const { name, setName } = useAppContext();
  const [isModalVisible, setModalVisible] = useState(false);
  const userData = useUserData();
  const [isInvited] = useSearchParams();
  const isNewUser = isInvited.get("newUser") === "true";


  useEffect(() => {
    if (userData.dateOfBirth && isNewUser) {
      let date = userData.dateOfBirth;
      date.setFullYear(date.getFullYear() + 18);
      if (date > new Date()) setModalVisible(true);
    }
  }, [userData.dateOfBirth, isNewUser]);

  return (
    <>
      <main className="bg-blue-300 flex flex-col items-center relative">
        <div className="py-40 ">
          <h1 className="text-orange-500 text-5xl font-bold text-center">Университет будущего</h1>
          <h1 className="text-5xl font-bold text-center">для детей и взрослых</h1>
          <p className="text-lg uppercase text-center max-w-[1030px] mt-4">Контент</p>
        </div>
      </main>
      <ModalSendInvite isVisible={isModalVisible} setVisible={setModalVisible}></ModalSendInvite>
      <button
        className="text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg w-28 bg-orange-600"
        onClick={() => setModalVisible(true)}
      >
        Показать
      </button>
    </>
  );
};

export default Main;
