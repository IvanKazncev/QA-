import React from "react";
import { useAppContext } from "../Context";
import { MainPage } from "../components/MainPage";

const Main = () => {
  const { name, setName } = useAppContext();
  return (
    <>
      <MainPage />
    </>
  );
};

export default Main;
