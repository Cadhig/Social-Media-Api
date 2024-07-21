const router = require('express').Router()
const User = require('../../models/User')

router.post('/', (req, res) => {
    const { username, email, thoughts, following } = req.body
    User.create({
        username: username,
        email: email,
        thoughts: thoughts,
        following: following
    })
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
        })
})

router.get('/', (req, res) => {
    User.find()
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
        })
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
        })
})

router.put('/:id', (req, res) => {
    const { username, email } = req.body
    User.where("_id").equals(req.params.id).updateOne({
        username: username,
        email: email,
    })
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
        })
})

router.delete('/:id', (req, res) => {
    User.where("_id").equals(req.params.id).deleteOne()
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
        })
})

router.post('/:userId/following/:userTwoId', (req, res) => {
    const { username, email, thoughts, following } = req.body
    User.where("_id").equals(req.params.userId).updateOne({
        following: [req.params.userTwoId]
    })
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
        })
})

router.delete('/:userId/following/:userToRemove', (req, res) => {
    const { username, email, thoughts, following } = req.body
    let followList
    User.findById(req.params.userId)
        .then((result) => {
            followList = result.following
        })
        .catch((err) => {
            console.error(err)
        })
    let userToUnfollow
    for (let i = 0; i < followList.length; i++) {
        if (req.params.userToRemove === followList[i]) {
            userToUnfollow = i
        }
    }
    User.where("_id").equals(req.params.userId).updateOne({
        following: [userToUnfollow] = null
    })

    // User.where("_id").equals(req.params.userId).where("following").equals(req.params.userToRemove).updateOne({
    //     following: 1
    // })
    //     .then((result) => {
    //         return res.json(result)
    //     })
    //     .catch((err) => {
    //         console.error(err)
    //     })
})

module.exports = router