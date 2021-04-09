import BaseRoute from '../BaseRoute'
import express from 'express'
import shortid from 'shortid'
import User from '../../model/User'
import Organization from '../../model/Organization'
import asyncHandler from 'express-async-handler'
import authenticate from '../../middleware/auth'
import Item from '../../model/Item'
import InventoryEvent from '../../model/InventoryEvent'

export default class OrganizationRoute extends BaseRoute {
    constructor(path: string) {
        super(path)
    }

    configure(app: express.Application): void {
        const router = express.Router()
        router.use(authenticate)
        router.post('/create', asyncHandler(this.handleCreationRequest))
        router.get('/:id', asyncHandler(this.getOrganizationData))
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

    async getOrganizationData(req: any, res: any) {
        const { id } = req.params
        const organization = await Organization.findOne({ id }).populate('User').populate('Owner').exec()
        if (organization) {
            const items = await Item.find({ organization: id }).exec()
            const events = await InventoryEvent.find({ organization: id }).exec()
            return res.status(200).json({ success: true, message: 'Request successful', organization, items, events })
        } else {
            res.status(404).json({ success: false, message: 'No organization found with that id' })
        }
    }
}
