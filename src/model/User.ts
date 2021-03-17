import { Schema } from 'mongoose'

const mongoose = require('mongoose')

const schema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    password_salt: { type: String, required: true },
})

const UserModel = mongoose.model("User", schema);

export default UserModel;

