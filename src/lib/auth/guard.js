import jwt from "jsonwebtoken";
import { AppError } from "../error/error.js";
import {env} from "../config/env.js"

export function authGuard(req,res,next) {
   try {
     const token = req.cookies.access_token;
    if(!token) throw new AppError('no token provided',403);
    req.user = jwt.verify(token, env.jwt.secret)
    next();
   } catch (error) {
    next(error)
   }
}