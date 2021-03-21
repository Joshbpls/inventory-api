import mongoose, { Document, Schema } from 'mongoose'
import User, { UserDocument } from './User'

export interface OrganizationDocument extends Document {
    id: string
    name: string
    owner: UserDocument['_id']
    members: Array<UserDocument['_id']>
}

export const schema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
})

const OrganizationModel = mongoose.model<OrganizationDocument>('Organization', schema)

export default OrganizationModel
