import BaseRoute from '../BaseRoute'
import express from 'express'
import User from '../../model/User'
import Organization from '../../model/Organization'
import authenticate from '../../middleware/auth'
import InventoryEvent from '../../model/InventoryEvent'
import asyncHandler from 'express-async-handler'

export interface AddRequestBody {
    user?: string
    action?: string
    organization?: string
}

export default class EventLogRoute extends BaseRoute {
    constructor(path: string) {
        super(path)
    }

    configure(app: express.Application): void {
        const router = express.Router()
        router.use(authenticate)
        router.post('/add', asyncHandler(this.addEvent))
        router.get('/:id/list', asyncHandler(this.getActivity))
        app.use(this.path, router)
    }

    async getActivity(req: any, res: any) {
        const { id } = req.params
        const result = await Organization.findOne({ id }).exec()
        if (result) {
            const events = await InventoryEvent.find({ organization: result._id })
                .limit(5)
                .sort('-timestamp')
                .populate({ path: 'user', select: 'name' })
                .exec()
            return res.json({ success: true, events })
        } else {
            return res.json({ success: false, message: 'Invalid organization ID!' })
        }
    }

    async addEvent(req: any, res: any) {
        const { user, action, organization } = req.body as AddRequestBody
        const foundUser = await User.findOne({ id: user }).exec()
        const foundOrganization = await Organization.findOne({ id: organization }).exec()
        if (foundUser && foundOrganization) {
            const event = new InventoryEvent({
                user: foundUser._id,
                organization: foundOrganization._id,
                action: action
            })
            await event.save()
            return res.json({ success: true, message: 'Added inventory action' })
        } else {
            return res.json({ success: false, message: 'User or organization was null' })
        }
    }
}
