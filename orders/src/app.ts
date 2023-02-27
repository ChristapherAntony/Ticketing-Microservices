import express from "express";
require('express-async-errors');  //to throw errors in async req also
import { json } from "body-parser"; 3

import cookieSession from 'cookie-session';
import { errorHandler,NotFoundError,currentUser } from "@getmytickets/common";

import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes/index';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
 

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


app.use(currentUser)  //after cookieSession code  middle ware from npm
app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);
app.all('*', async () => {             //used app.all insted of get or post to available for all req
  throw new NotFoundError()   //invalid api calling-write before errorHandler middleware
})

app.use(errorHandler); //error handiling middle ware every thrown error goes to this middle ware


export {app}