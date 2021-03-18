import { Schema } from 'mongoose'

const mongoose = require('mongoose')

export const schema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
})

const OrganizationModel = mongoose.model('Organization', schema)

export default OrganizationModel
