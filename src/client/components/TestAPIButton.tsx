import React from "react";

export const TestAPIButton: React.FC = () => {
  const testAPIFunction = () => {
    let payload = {
      tel: "888",
      password: "123",
    };
    fetch("/PostTest", {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(response => console.log(response));
  };

  return (
    <button
      onClick={e => {
        e.preventDefault();
        testAPIFunction();
      }}
      className="bg-orange-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg w-28"
    >
      API TEST
    </button>
  );
};
