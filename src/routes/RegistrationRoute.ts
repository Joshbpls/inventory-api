import User from '../model/User'
import crypt from 'crypto'
import express from 'express'
import asyncHandler from 'express-async-handler'
import BaseRoute from './BaseRoute'
import shortid from 'shortid'
import { createToken } from '../token/TokenGenerator'

function createUser(id: string, email: string, password: string, name: string) {
    const salt = crypt.randomBytes(16).toString('hex')
    const hashed = crypt.scryptSync(password, salt, 64).toString('utf-8')
    return new User({ id, email, name, password: hashed, password_salt: salt })
}

export default class RegistrationRoute extends BaseRoute {
    public constructor(path: string) {
        super(path)
    }

    configure(app: express.Application) {
        app.post(this.path, asyncHandler(this.handle))
    }

    async handle(req: any, res: any) {
        const { email, password, name } = req.body
        if (!email || !password || !name) {
            return res.json({ success: false, message: 'Email, password, and name fields are required' })
        }
        const exists = await User.exists({ email })
        if (exists) {
            return res.json({ success: false, message: 'A user with that email already exists' })
        }
        const id = shortid.generate()
        const created = createUser(id, email, password, name)
        await created.save()
        const token = createToken(id, email)
        res.status(200).json({ success: true, message: 'Account creation successful', token })
    }
}
