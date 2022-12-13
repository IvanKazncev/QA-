import { useSyncExternalStore } from "react";
import { userDataStore } from "../store/userDataStore";

export const useUserDataStore = () => {
  const userData = useSyncExternalStore(userDataStore.subscribe, userDataStore.getState, userDataStore.getState);
  return {
    userData,
    setUserTel: (tel: string | null) => {
      userDataStore.setState({
        ...userData,
        tel,
      });
    },
    setUserEmail: (email: string | null) => {
      userDataStore.setState({
        ...userData,
        email,
      });
    },
  };
};
