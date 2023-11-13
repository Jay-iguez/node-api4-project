const Users = require('../data/mainData')
const { checkBody } = require('../data/middleware')
const express = require('express')
const router = express.Router()

router.get('/users', async (req, res) => {
    try {
        const users = await Users.fetchUsers()
        res.status(200).json(users)
    } catch(err) {
        console.log("Error in getting users.")
        next(err)
    }
})

router.post('/register', checkBody, async (req, res) => {
    try {
        const newUser = await Users.createUser({ username: req.body.username, password: req.body.password})
        res.status(201).json(newUser)
    } catch(err) {
        console.log('Error in creating new user.')
        next(err)
    }
})

router.post('/login', checkBody, async (req, res) => {
    try {
        const loggedIn = await Users.checkCredentials({ username: req.body.username, password: req.body.password})
        if (loggedIn) {
            res.status(200).json({
                message: "Welcome: " + req.body.username + "!"
            })
        } else {
            res.status(401).json({
                message: "Wrong login information."
            })
        }
    } catch(err) {
        console.log("Error in logging in.")
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status).json({
        message: err.message
    })
})

module.exports = router