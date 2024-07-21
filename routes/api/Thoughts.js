const router = require('express').Router()
const Thoughts = require('../../models/Thoughts')
const User = require('../../models/User')

router.post('/:userId', async (req, res) => {
    const { thoughtText } = req.body
    const user = await User.findById(req.params.userId)
    Thoughts.create({
        username: user.username,
        thoughtText: thoughtText,
    })
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
        })
})

module.exports = router