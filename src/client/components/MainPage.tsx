import React from "react";

export const MainPage: React.FC = () => {

  return (
    <main className="bg-blue-300 flex flex-col items-center relative">
      <div className="py-40 ">
        <h1 className="text-orange-500 text-5xl font-bold text-center">Университет будущего</h1>
        <h1 className="text-5xl font-bold text-center">для детей и взрослых</h1>
        <p className="text-lg uppercase text-center max-w-[1030px] mt-4">
          Контент
        </p>
      </div>
    </main>
  );
};
