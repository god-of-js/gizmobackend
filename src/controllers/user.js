const User = require('../models/user')
const Token = require('../services/tokens')
module.exports.register = async (req, res) => {
    const {name, email, phone, password} = req.body;
    if(!name || !email || !phone, !password) 
        res.send({error: true, message: 'Name, email, phone and password are compulsory fields'});
    const exists = User.find({email: email})
    const existsNum = User.find({phone: phone})
    if(exists.length > 0 ) res.status(400).json({message: 'This email exists in our database already'})
    if(existsNum.length > 0 ) res.status(400).json({message: 'This Phone Number exists in our database already'})
    const user = new User({
        name,
        password,
        email,
        phone,
        createdAt: Date.now()
    })
    await user.save().catch((e) => {
        res.status(400).json({message: e.message})
    })
    const data = user.toJson();
    delete data.password
    const jwt = Token.create({
        name,
        password,
        email,
        phone,
        createdAt: Date.now()
    },
    { expiresIn: '7d', issuer: 'house-app' })
    return res.status(200).json({
        data,
        jwt,
        message: 'Account created successfully'

    })
}