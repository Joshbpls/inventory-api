import mongoose, { Document, Schema } from 'mongoose'
import { OrganizationDocument } from './Organization'

export interface ItemDocument extends Document {
    id: string
    name: string
    amount: number
    category?: string
    organization: OrganizationDocument['_id']
}

const schema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
    category: { type: String, required: false, default: 'N/A' },
    organization: { type: Schema.Types.ObjectId, required: true }
})

const ItemModel = mongoose.model<ItemDocument>('Item', schema)

export default ItemModel
