import { createStore } from "./createStore";

export interface IuserData {
    tel: string | null,
    email: string | null,
}

export const userDataStore = createStore<IuserData>({tel: null, email: null});
// export const userDataStore = createStore<string|null>(null);

