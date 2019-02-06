const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const verifyToken = require('../Utils/AuthUtil')

router.post('/api/posts', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json({ message: "authentication error..." })
        } else {
            res.json({
                message: "post created...",
                authData
            })
        }
    })
})

router.post('/api/login', (req, res) => {
    const mockuser = {
        id: 1,
        username: "isuru",
        email: "isuru@gmail.com"
    }

    jwt.sign({ user: mockuser }, 'secretkey', {expiresIn: '300s'},(err, newtoken) => {
        res.json({
            token: newtoken
        })
    });
})

module.exports = router