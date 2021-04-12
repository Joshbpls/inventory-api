import BaseRoute from '../BaseRoute'
import express from 'express'
import { containsFields } from '../Validator'
import Item from '../../model/Item'
import Organization from '../../model/Organization'
import shortid from 'shortid'
import authenticate from '../../middleware/auth'
import asyncHandler from 'express-async-handler'

interface ItemProperties {
    name?: string
    amount?: number
    category?: string
    organization?: string
}

interface ItemUpdatePayload {
    name?: string
    amount?: number
    category?: string
}

const setFieldIfPresent = (document: any, field: string, value?: any) => {
    if (value) {
        document[field] = value
    }
}

export default class ItemRoute extends BaseRoute {
    constructor(path: string) {
        super(path)
    }

    configure(app: express.Application): void {
        const router = express.Router()
        router.use(authenticate)
        router.post('/create', asyncHandler(this.onItemCreate))
        router.post('/:id/update', asyncHandler(this.onItemUpdate))
        app.use(this.path, router)
    }

    async onItemUpdate(req: any, res: any) {
        const payload = req.body as ItemUpdatePayload
        const { id } = req.params
        const item = await Item.findOne({ id }).exec()
        if (item) {
            await item.updateOne(payload)
            res.json({ success: true, message: 'Update successful' })
        } else {
            res.json({ success: false, message: 'Item with that ID not found' })
        }
    }

    async onItemCreate(req: any, res: any) {
        const body = req.body as ItemProperties
        const isValid = containsFields(body, ['name', 'amount', 'organization'])
        if (isValid) {
            const organization = await Organization.findOne({ id: body.organization }).exec()
            if (organization) {
                const id = shortid.generate()
                const item = new Item({
                    id,
                    name: body.name,
                    amount: body.amount,
                    category: body.category,
                    organization: organization._id
                })
                await item.save()
                res.json({ success: true, message: 'Item creation successful' })
            }
        } else {
            res.json({ success: false, message: 'Required fields are missing' })
        }
    }
}
