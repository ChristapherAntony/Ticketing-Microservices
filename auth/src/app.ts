import express from "express";
require('express-async-errors');  //to throw errors in async req also
import { json } from "body-parser"; 3

import cookieSession from 'cookie-session';

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
// import { errorHandler,NotFoundError } from "@getmytickets/common";
import { errorHandler,NotFoundError } from "@cygnetops/common";

const app = express();
app.set('trust proxy', true);  //https 
app.use(json());
app.use(
  cookieSession({
    signed: false,         //no need for encryption because of jwt already encrypted
    // secure: true           //
    secure: process.env.NODE_ENV !== 'test'  //for work with super test other wise use above
  })
);  // to use cookie for sending jwt inside it

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {             //used app.all insted of get or post to available for all req
  throw new NotFoundError()   //invalid api calling-write before errorHandler middleware
})

app.use(errorHandler); //error handiling middle ware every thrown error goes to this middle ware


export {app}