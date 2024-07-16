import mongoose from "mongoose";
import isEmail from "validator"

const userSchema = new mongoose.Schema({
    username: { type: string, unique: true, required: true, trim: true },
    email: { type: string, unique: true, required: true, validate: [isEmail, 'invalid email'] },
    // thoughts:
    // friends:
})

export const User = mongoose.model('User', userSchema)

const handleError = () => console.error(err)

User.create({
    username: 'Cadhig',
    email: 'cadencehiggins@gmail.com'
    // thoughts
    // friends
})
    .then(result => console.log('Created user data', result))
    .catch(err => handleError(err))
