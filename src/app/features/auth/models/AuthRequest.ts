import { Request } from "express";
import { User } from "../../users/interfaces/user.entity";

export interface AuthRequest extends Request {
    user: User
}