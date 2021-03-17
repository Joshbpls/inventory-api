import { Schema } from 'mongoose'

const mongoose = require('mongoose')

export const schema: Schema = new Schema({
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }]
})

const OrganizationModel = mongoose.model("Organization", schema);

export default OrganizationModel;