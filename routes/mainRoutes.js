const Users = require('../data/mainData')
const express = require('express')
const router = express.Router()

router.get('/users', async (req, res) => {
    try {
        const users = await Users.fetchUsers()
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json({
            message: 'Error in getting users: ' + err.message
        })
    }
})

module.exports = router