const router = require('express').Router()
const Thoughts = require('../../models/Thoughts')

router.post('/:userId', (req, res) => {
    const { thoughtText } = req.body
    Thoughts.create({
        username: req.params.userId,
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