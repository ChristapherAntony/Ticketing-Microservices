import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from '../models/user';
import { BadRequestError,validateRequest } from "@getmytickets/common";

import jwt from 'jsonwebtoken';

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
  validateRequest,//common middleware to handel error from express-validator
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email in use');               //general custom error
    }

    const user = User.build({ email, password });
    await user.save();   //save user to db

    // Generate JWT
    const userJwt = jwt.sign({id: user.id,email: user.email},process.env.JWT_KEY!);//env from kubernetes secret  (! to over rode typescript error)
    // Store it on session object
    req.session = {
      jwt: userJwt
    };
    
    res.status(201).send(user);

  }
);

export { router as signupRouter };
