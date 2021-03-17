import { Schema } from 'mongoose'

const mongoose = require('mongoose')

const schema: Schema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
    category: { type: Number, required: false },
    organization: { type: Schema.Types.ObjectId, required: true },
})

const ItemModel = mongoose.model('Item', schema)

export default ItemModel
