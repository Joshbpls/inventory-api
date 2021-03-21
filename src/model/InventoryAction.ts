import mongoose, { Document, Schema } from 'mongoose'
import { UserDocument } from './User'
import { OrganizationDocument } from './Organization'

export interface InventoryActionDocument extends Document {
    user: UserDocument['_id']
    organization: OrganizationDocument['_id']
    action: string
    amount: number
}

const schema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    action: { type: String, required: true },
    amount: { type: Number, required: true },
})

const InventoryActionModel = mongoose.model<InventoryActionDocument>('InventoryAction', schema)

export default InventoryActionModel
