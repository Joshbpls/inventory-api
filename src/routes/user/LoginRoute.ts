import asyncHandler from "express-async-handler";
import crypt from 'crypto'
import User from '../../model/User'
import express from 'express'
import BaseRoute from "../BaseRoute";
import {createToken} from "../../token/TokenGenerator";

const WRONG_CREDENTIALS = {success: false, message: "Wrong email and password combination"}
const DOES_NOT_EXIST = {success: false, message: "User with that email does not exist"}

export default class LoginRoute extends BaseRoute {

    constructor(path: string) {
        super(path)
    }

    configure(app: express.Application) {
        app.post(this.path, asyncHandler(this.handle))
    }

    async handle(req: any, res: any) {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.json({success: false, message: "Email and password fields are required"})
        }
        const user = await User.findOne({ email }).exec()
        if (user != null) {
            const salt = user.password_salt;
            const hashed = crypt.scryptSync(password, salt, 64)
            if (user.password === hashed) {
                const token = createToken(email)
                return res.status(200).json({success: true, message: "Login successful", token: token})
            }
            return res.status(403).json(WRONG_CREDENTIALS)
        }
        return res.status(404).json(DOES_NOT_EXIST)
    }
}
