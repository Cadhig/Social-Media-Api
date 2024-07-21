const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    thoughts: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Thoughts"
    },
    following: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User"
    }
})

userSchema.virtual('followingCount').get(function () {
    return `${this.username} is following ${this.following.length} people!`
})


module.exports = mongoose.model("User", userSchema)
