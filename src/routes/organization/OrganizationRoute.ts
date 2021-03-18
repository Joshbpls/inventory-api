import BaseRoute from '../BaseRoute'
import express from 'express'
import shortid from 'shortid'
import User from '../../model/User'
import Organization from '../../model/Organization'
import asyncHandler from 'express-async-handler'

export default class OrganizationRoute extends BaseRoute {
    configure(app: express.Application): void {
        const router = express.Router()
        router.post('/organization/create', asyncHandler(this.handleCreationRequest))
    }

    async handleCreationRequest(req: any, res: any) {
        const { user, body } = req
        const name = body.name
        if (name) {
            const userDocument = await User.findOne({ id: user.id }).exec()
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
