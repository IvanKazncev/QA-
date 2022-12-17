import { useSyncExternalStore } from "react";
import { createStore } from "../store/createStore";

const store = createStore ({ name: null, surname: null, dateOfBirth: null, email: null, password: null, tel: null, isAuth: false });

export const useUserData = () => {
  const data = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  return {
    ...data,
    nullifyData: () => store.setState({ name: null, surname: null, dateOfBirth: null, email: null, password: null, tel: null, isAuth: false}),
    setState: store.setState,
  };
};