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
        router.post('/create', asyncHandler(this.createOrganization))
        router.get('/:id', asyncHandler(this.getOrganizationData))
        router.get('/:id/items', asyncHandler(this.getItems))
        app.use(this.path, router)
    }

    async exists(req: any, res: any, next: any) {
        const { id } = req.params
        const found = await Organization.findOne({ id })
        if (found) {
            next()
        } else {
            res.json({ success: false, message: 'Organization not valid' })
        }
    }

    async createOrganization(req: any, res: any) {
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
            const items = await Item.find({ organization: organization._id }).exec()
            const events = await InventoryEvent.find({ organization: organization._id }).exec()
            return res.status(200).json({ success: true, message: 'Request successful', organization, items, events })
        } else {
            res.status(404).json({ success: false, message: 'No organization found with that id' })
        }
    }

    async getItems(req: any, res: any) {
        const { id } = req.params
        const orgObjectId = await Organization.findOne({ id }).exec()
        const items = await Item.find({ organization: orgObjectId }).exec()
        return res.json({ success: true, items })
    }
}
