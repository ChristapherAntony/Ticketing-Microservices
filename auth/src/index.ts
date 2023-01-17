import express from "express";
require('express-async-errors');  //to throw errors in async req also
import { json } from "body-parser"; 3
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set('trust proxy', true);  //https 
app.use(json());
app.use(
  cookieSession({
    signed: false,         //no need for encryption because of jwt already encrypted
    secure: true           //
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



const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {console.log('Listening on port 3000!!!!!!!!');});
};
start();