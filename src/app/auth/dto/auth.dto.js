import {z} from 'zod'
export const registerDTO = z.object({
    email: z.email({message:"invalid email format"}).trim().toLowerCase(),
    name : z.string().trim().min(2).max(20),
    password: z.string().trim().min(8).max(16),
    dob : z.date().optional(),
    gender: z.enum(['male','female']).optional(),
});

export const verifyAccountDTO = z.object({
     email: z.email().trim().toLowerCase(),
        code: z.string().trim().length(6),
})

export const loginDTO = z.object({
     email: z.email().trim().toLowerCase(),
    password: z.string().trim().min(8).max(16),
});

export const sendOtpDTO = z.object({
         email: z.email().trim().toLowerCase(),

});

export const resetPasswordDTO = z.object({
         email: z.email().trim().toLowerCase(),
        code: z.string().trim().length(6),
        newPassword: z.string().trim().min(8).max(16),
});

