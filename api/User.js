import { Router } from "express"
import { User } from "../models/User"

const router = Router()

router.post('/', (req, res) => {
    User.create({
        username: 'Cadhig',
        email: 'cadencehiggins@gmail.com'
        // thoughts
        // friends
    })
        .then(result => console.log('Created user data', result))
        .catch(err => console.error(err))
})
