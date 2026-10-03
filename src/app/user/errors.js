import { AppError } from "../../lib/error/error.js";
export const userNotExist = new AppError('User Not Exists.', 404)
export const userAlreadyExist = new AppError('User already exist', 409)
export const userAlreadyVerified = new AppError('User already verified', 400)
export const userNotVerified = new AppError ('user Not Verified',403)