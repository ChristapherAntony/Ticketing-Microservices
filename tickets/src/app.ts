import express from "express";
require('express-async-errors');  //to throw errors in async req also
import { json } from "body-parser"; 3

import cookieSession from 'cookie-session';
import { errorHandler,NotFoundError,currentUser } from "@getmytickets/common";
// import { errorHandler,NotFoundError,currentUser } from "@cygnetops/common";
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from "./routes/updates";
 

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


app.get('/api/tickets/hello',(req,res)=>{
  console.log("api call@@@@@@@@@@@@@@@@");
  res.json(200)
})

app.use(currentUser)  //after cookieSession code  middle ware from npm
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
app.all('*', async () => {             //used app.all insted of get or post to available for all req
  throw new NotFoundError()   //invalid api calling-write before errorHandler middleware
})

app.use(errorHandler); //error handiling middle ware every thrown error goes to this middle ware


export {app}