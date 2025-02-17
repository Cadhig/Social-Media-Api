const router = require('express').Router()
const Thoughts = require('../../models/Thoughts')
const User = require('../../models/User')

router.get('/', (req, res) => {
    Thoughts.find()
        .then((response) => res.json(response))
})

router.get('/:id', (req, res) => {
    Thoughts.findById(req.params.id)
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

router.put('/:userId/:thoughtId', async (req, res) => {
    const { thoughtText } = req.body
    const user = await User.findById(req.params.userId)
    const updateThought = await Thoughts.where("_id").equals(req.params.thoughtId).updateOne({
        username: user.username,
        thoughtText: thoughtText,
    })
    user.thoughts.push(updateThought._id)
    await user.save()
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
        })
})

router.delete('/:userId/:thoughtId', async (req, res) => {
    const user = await User.findById(req.params.userId)
    const deleteThought = await Thoughts.where("_id").equals(req.params.thoughtId).deleteOne()
    const deleteThoughtFromUser = user.thoughts.indexOf(deleteThought._id)
    user.thoughts.splice(deleteThoughtFromUser)
    await user.save()
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
        })
})

module.exports = router