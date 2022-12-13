export const TestAPIFoo = (tel:string, password:string) => {
  let payload = {
    tel: tel,
    password: password,
  };
  fetch("/LogIn", {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(response => console.log(response));
};
