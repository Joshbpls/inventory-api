import BaseRoute from './BaseRoute'
import express from 'express'
import { getToken } from '../token/TokenGenerator'
import jwt, { Secret } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

export default class AuthVerifierRoute extends BaseRoute {
    constructor(path: string) {
        super(path)
    }

    configure(app: express.Application) {
        app.get('/', asyncHandler(this.handle))
    }

    async handle(req: any, res: any) {
        const token = getToken(req.headers.authorization)
        jwt.verify(token, process.env.SECRET_KEY as Secret, (err) => {
            if (err) {
                res.status(403).json({ success: false, message: 'Token not valid' })
            } else {
                res.status(200).json({ success: true, message: 'Token is valid' })
            }
        })
    }
}
