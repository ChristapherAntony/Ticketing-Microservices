import express from "express";
require('express-async-errors');  //to throw errors in async req also
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*',async()=>{             //used app.all insted of get or post to available for all req
  throw new NotFoundError()   //invalid api calling-write before errorHandler middleware
})

app.use(errorHandler); //error handiling middle ware every thrown error goes to this middle ware

app.listen(3000, () => {
  console.log("Listening on port 3000!!!!!!!!");
});
