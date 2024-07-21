const mongoose = require('mongoose')

function formatDate(createdAt) {
    return createdAt.toString()
}

const reactionSchema = new mongoose.Schema({
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        get: formatDate
    }
})

const thoughtsSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        get: formatDate
    },
    username: {
        type: [mongoose.SchemaTypes.String],
        userId: [mongoose.SchemaTypes.ObjectId],
        ref: "User"
    },
    reactions: [reactionSchema]
})

thoughtsSchema.virtual('reactionCount').get(function () {
    return `${this.reactions.length} reactions`
})

module.exports = mongoose.model("Thoughts", thoughtsSchema)