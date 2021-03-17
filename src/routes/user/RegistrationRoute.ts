import jwt, {Secret} from 'jsonwebtoken';
import User from "../../model/User";
import crypt from 'crypto'
import express from 'express'
import asyncHandler from 'express-async-handler'
import BaseRoute from "../BaseRoute";
import {createToken} from "../../token/TokenGenerator";

export default class RegistrationRoute extends BaseRoute {

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
        const exists = await User.exists({email})
        if(exists) {
            return res.json({ success: false, message: "A user with that email already exists"})
        }
        const salt = crypt.randomBytes(16).toString("hex")
        const hashed = crypt.scryptSync(password, salt, 64)
        const created = new User({ email, password: hashed, password_salt: salt})
        await created.save()
        const token = createToken(email)
        res.status(200).json({ success: true, message: "Account creation successful", token})
    }
}
