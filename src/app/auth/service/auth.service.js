import * as authRepository from '../repository/auth.repository.js';
import * as otpRepository from '../repository/otp.repository.js';
import * as userRepository from '../../user/repository/user.repository.js'
import {generateOTPCode} from "../../../common/utils/otp.js"
import {sendEmail} from "../../../common/email/nodemailer.js";
import { toMs } from '../../../common/utils/time.js';
import { invalidCode, invalidPassword, otpExpired } from '../errors.js';
import { userAlreadyExist, userAlreadyVerified, userNotExist, userNotVerified } from '../../user/errors.js';
import { generateToken } from '../utils/token.js';
import {  comparePassword, hashPassword } from '../utils/hash.js';
import { verifyGoogleToken } from '../../../common/utils/google-auth.js';





export async function register(userData) {
   
    const userExist = await authRepository.checkUserExistByEmail(userData.email);

    if (userExist) throw userAlreadyExist;

    userData.password = await hashPassword(userData.password)

    const  createdUser = await authRepository.createUser(userData);

    const  code = generateOTPCode();
    await otpRepository.createOTP({
    code: code,
    email: userData.email,
    expiresAt: new Date(Date.now() + toMs(5,'minutes')),
});
    await sendEmail(userData.email,
        'verification code',
        'Your verification code is: ' + code + ' ')
return createdUser;
}

export async function verifyAccount(email, code) {
   const user =  await authRepository.checkUserExistByEmail(email);
    if (!user) throw userNotExist;
    if (user.isVerified === true) throw userAlreadyVerified;
    const otp = await otpRepository.getOtpByEmail(email);
    if (!otp) throw otpExpired;
    if (otp.code !== code) throw invalidCode;
    const updatedUser = await userRepository.updateUserByEmail(email,{isVerified:true});
    await otpRepository.deleteOTPsByEmail(email);
    return updatedUser;
}


export async function login(email, password){
const user = await authRepository.checkUserExistByEmail(email)
if(!user) throw userNotExist
if(user.isVerified === false) throw userNotVerified
const match = await comparePassword(password,user['password'])
if(!match) throw invalidPassword
return generateToken({id:user._id,name:user.name})
}

export async function sendOtp(email){
 const user = await authRepository.checkUserExistByEmail(email)
if(!user) throw userNotExist
await otpRepository.deleteOTPsByEmail(email)   
const  code = generateOTPCode();
await otpRepository.createOTP({
    code:code,
    email:email,
    expiresAt: new Date(Date.now() + toMs(3,'minutes')),
})
await sendEmail(email,'new otp', `<p>your new otp is ${code}</p>`);


}


export async function resetPassword(email,code,newPassword){
    const otp = await otpRepository.getOtpByEmail(email);
    if(!otp) throw otpExpired;
    if(otp.code !== code) throw invalidCode;
    const hashedPassword = await hashPassword(newPassword);
    userRepository.updateUserByEmail(email,{passwoed:hashedPassword});
    otpRepository.deleteOTPsByEmail(email);
}


export async function loginWithGoogle(idToken) {
const payload = await verifyGoogleToken(idToken);
const user = await authRepository.checkUserExistByEmail(payload.email);
if (user){
    return generateToken({
        id: user._id,
        email: user.email,
    });
}
const createdUser = await authRepository.createUser({
    name:payload.name,
    email:payload.email,
    provider:'google',
    isVerified: true

});
return generateToken({
    id:createdUser._id,
    email:createdUser.email,
})
}