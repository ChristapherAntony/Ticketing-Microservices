import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // This is javascript land (not ts)
      // const error = new Error("Invalid email or password");
      // error.reasons = errors.array();
      // throw new Error("Invalid email or password");               //what ever wite first is message
      throw new RequestValidationError(errors.array());
    }
    console.log("Creating a user...");
    // throw new Error("Error connecting to database");
    throw new DatabaseConnectionError();  //by using custom error handler subclass can sen more information 

    res.send({});
  }
);

export { router as signupRouter };
