const router = require('express').Router()
const userApi = require('./api/User')
const thoughtsApi = require('./api/Thoughts')

router.use('/api/users', userApi)
router.use('/api/thoughts', thoughtsApi)


module.exports = router