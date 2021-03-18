import BaseRoute from '../BaseRoute'
import express from 'express'
import asyncHandler from 'express-async-handler'
import Organization from '../../model/Organization'

export default class UserRoute extends BaseRoute {
    constructor(path: string) {
        super(path)
    }

    configure(app: express.Application): void {
        const router = express.Router()
        router.get('/organizations', asyncHandler(this.getUserOrganizations))
        app.use('/user', router)
    }

    async getUserOrganizations(req: any, res: any) {
        const user = req.user
        const organizations = await Organization.where('members').all(user.id)
        return res.status(200).json({ organizations })
    }
}
