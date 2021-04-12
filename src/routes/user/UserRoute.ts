import BaseRoute from '../BaseRoute'
import express from 'express'
import asyncHandler from 'express-async-handler'
import Organization from '../../model/Organization'
import authenticate from '../../middleware/auth'
import User from '../../model/User'

export default class UserRoute extends BaseRoute {
    constructor(path: string) {
        super(path)
    }

    configure(app: express.Application): void {
        const router = express.Router()
        router.use(authenticate)
        router.get('/orgs', asyncHandler(this.getUserOrganizations))
        app.use(this.path, router)
    }

    async getUserOrganizations(req: any, res: any) {
        const user = req.user
        const userDocument = await User.findOne({ email: user.email })
        if (userDocument) {
            const orgs = await Organization.find()
                .or([{ owner: userDocument._id }, { members: { $in: [userDocument._id] } }])
                .populate({ path: 'owner', select: 'name' })
            return res.status(200).json({ success: true, message: 'Request successful', orgs })
        } else {
            res.json({ success: false, message: 'Unable to find user document' })
        }
    }
}
