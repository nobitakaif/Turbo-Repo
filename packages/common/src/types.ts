import {ParseStatus, z} from "zod"

export const CreateUserSchema = z.object({
    username : z.string().min(3).max(40),
    password : z.string().min(8).max(40),
    name : z.string()
})

export const SigninSchema = z.object({
    username : z.string().min(3).max(40),
    password : z.string().min(8).max(40)
})

export const CreateRoomSchema = z.object({
    name : z.string().min(3).max(80)
})

