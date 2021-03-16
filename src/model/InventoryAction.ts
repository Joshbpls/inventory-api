import mongoose, { Schema } from 'mongoose'

const schema: Schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    organization: {type: Schema.Types.ObjectId, ref: "Organization", required: true},
    action: {type: String, required: true},
    amount: {type: Number, required: true},
})

const InventoryActionModel = mongoose.model("InventoryAction", schema);

export default InventoryActionModel;