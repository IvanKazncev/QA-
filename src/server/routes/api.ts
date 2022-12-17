"use strict";
import { Request, Response } from "express";

export interface IuserData {
  name: string | null;
  surname: string | null;
  tel: string | null;
  email: string | null;
  dateOfBirth: Date | null;
  password: string | null;
}

export const API_URLS = {
  requestTelCode: "/Registration/RequestTelCode",
  checkTelCode: "/Registration/CheckTelCode",
  requestEmailCode: "/Registration/RequestEmailCode",
  checkEmailCode: "/Registration/CheckEmailCode",
  login: "/Auth/Login",
  newUser: "/Registration/NewUser",
  logout: "/Auth/Logout",
};

/**
 * List of API examples.
 * @route GET /api
 */
// export const getApi = async (req: Request, res: Response) => {
//   return res.status(202).send("Test Api");
// };

let smsCode = "";
let emailCode = "";
let userData: IuserData = {
  name: "admin",
  surname: "",
  tel: "123",
  email: "admin@me.ru",
  dateOfBirth: new Date(),
  password: "admin", // по-правильному, тут должен быть хеш пароля
};

export const RequestTelCode = async (req: Request, res: Response) => {
  const payload = req.body;
  // console.log(payload);
  if (payload.telNumber) {
    smsCode = Math.floor(Math.random() * 9000 + 1000).toString();
    res.status(200).send(`SMS on ${payload.telNumber} sent (${smsCode})`);
  } else res.status(400).send(`Bad request`);
};

export const CheckTelCode = async (req: Request, res: Response) => {
  const payload = req.body;
  // console.log(payload);
  if (payload.telCode && smsCode) {
    if (payload.telCode === smsCode) {
      res.status(200).send(`Telephone number is confirmed`);
    } else res.status(200).send(`Wrong code`);
  } else res.status(400).send(`Bad request`);
};

export const RequestEmailCode = async (req: Request, res: Response) => {
  const payload = req.body;
  // console.log(payload);
  if (payload.email) {
    emailCode = Math.floor(Math.random() * 9000 + 1000).toString();
    res.status(200).send(`Code (${emailCode}) on ${payload.email} sent`);
  } else res.status(400).send(`Bad request`);
};

export const CheckEmailCode = async (req: Request, res: Response) => {
  const payload = req.body;
  // console.log(payload);
  if (payload.emailCode && emailCode) {
    if (payload.emailCode === emailCode) {
      res.status(200).send(`Email is confirmed`);
    } else res.status(200).send(`Wrong code`);
  } else res.status(400).send(`Bad request`);
};

// Далее - неготовые API

export const Login = async (req: Request, res: Response) => {
  const payload = req.body;
  // console.log(payload);
  if (payload.tel || payload.email) {
    if (payload.password === userData.password && (payload.tel === userData.tel || payload.email === userData.email)) {
      res
        .status(200)
        .send({ userData: userData, login: true, message: `User ${userData.name} ${userData.surname} logged in` });
    } else return res.status(401).send(`Wrong telephone, email or password`);
  } else res.status(400).send(`Bad request`);
};

export const NewUser = async (req: Request, res: Response) => {
  const payload: IuserData = req.body;
  userData = payload;
  Login(req, res);
};

export const Logout = async (req: Request, res: Response) => {
  // const payload: IuserData = req.body;
  // console.log(payload);
  // userData = payload;
};
