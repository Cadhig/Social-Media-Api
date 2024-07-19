import mongoose from "mongoose";
import isEmail from "validator"

const userSchema = new mongoose.Schema({
    username: { type: string, unique: true, required: true, trim: true },
    email: { type: string, unique: true, required: true, validate: [isEmail, 'invalid email'] },
    // thoughts:
    friends: [mongoose.SchemaTypes.ObjectId]
})

export const User = mongoose.model('User', userSchema)
