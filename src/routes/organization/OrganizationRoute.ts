import BaseRoute from '../BaseRoute'
import express from 'express'
import shortid from 'shortid'
import User from '../../model/User'
import Organization from '../../model/Organization'
import asyncHandler from 'express-async-handler'
import authenticate from '../../middleware/auth'

export default class OrganizationRoute extends BaseRoute {
    constructor(path: string) {
        super(path)
    }

    configure(app: express.Application): void {
        const router = express.Router()
        router.use(authenticate)
        router.post('/create', asyncHandler(this.handleCreationRequest))
        app.use(this.path, router)
    }

    async handleCreationRequest(req: any, res: any) {
        const { user, body } = req
        const name = body.name
        if (name) {
            const userDocument = await User.findOne({ email: user.email }).exec()
            if (userDocument) {
                const id = shortid.generate()
                const owner = userDocument._id
                const organization = new Organization({ id, name, owner })
                await organization.save()
                res.json({ success: true, message: 'Successfully created new organization' })
            } else {
                res.json({ success: false, message: 'Unable to find your user document' })
            }
        } else {
            res.json({ success: false, message: 'Organization must include a name' })
        }
    }
}
