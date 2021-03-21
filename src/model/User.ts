import mongoose, { Document, Schema } from 'mongoose'

export interface UserDocument extends Document {
    id: string
    email: string
    password: string
    password_salt: string
}

const schema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    password_salt: { type: String, required: true },
})

const UserModel = mongoose.model<UserDocument>('User', schema)

export default UserModel
