const router = require('express').Router()
const Thoughts = require('../../models/Thoughts')
const User = require('../../models/User')

router.get('/', (req, res) => {
    Thoughts.find()
        .then((response) => res.json(response))
})


router.post('/:userId', async (req, res) => {
    const { thoughtText } = req.body
    const user = await User.findById(req.params.userId)
    const newThought = await Thoughts.create({
        username: user.username,
        thoughtText: thoughtText,
    })
    user.thoughts.push(newThought._id)
    await user.save()
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
        })
})


module.exports = router