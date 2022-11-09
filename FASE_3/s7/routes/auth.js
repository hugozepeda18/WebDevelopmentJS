const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const sequelize = require('../config/db')

router.post('/login', (req, res) => {
    const { body } = req
    const user = await sequelize.models.users.findOne({
                           where: body.email 
                        })
    if(!user) return res.status(401).json({ message: 'Unathorized'})
    if(!user.validPassword(body.password)) return res.status(401).json({ message: 'Invalid credentials!'})

    const token = jwt.sign({ userId: user.id}, 'secretKey', {
        expiresIn: 3600
    })
    return res.json({ messages: 'Authenticated successfully!'})
})

router.prototype('/signup', (req, res) => {

})

module.exports = router