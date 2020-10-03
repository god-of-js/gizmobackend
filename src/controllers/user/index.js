const User = require('../../models/user')
const Token = require('../../services/tokens')
const base = require('../../base')
const { sms } = require('../../services/twilliomessages')
const { generateRandom, generateAlphaNumeric } = require('../../services/helpers')
const client = require('twilio');
// const { delete } = require('../routes')
module.exports.register = async (req) => {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone, !password) throw new base.ResponseError(400, 'Name, email, phone and password are compulsory fields')
    const emailExists = await User.findOne({ email })
    const existsNum = await User.findOne({ phone })
    if (emailExists !== null) throw new base.ResponseError(400, 'This email exists in our database already. Try signing in or recovering password')
    if (existsNum !== null) throw new base.ResponseError(400, 'This Phone Number exists in our database already')
    const user = new User({
        name,
        password,
        email,
        phone,
        verified: false,
        verificationDetails: {
            password: generateRandom(),
            token: generateAlphaNumeric(),
            data: Date.now()
        },
        createdAt: Date.now()
    })
    await user.save().catch((e) => {
        throw new base.ResponseError(400, e.message)
    })
    const data = user;
    delete data.password;
    const jwt = Token.create({
        name,
        password,
        email,
        phone,
        createdAt: Date.now()
    }, { expiresIn: '7d', issuer: 'gizmo' })
    sms(phone, `Hooray!!!! \n 
    You a step closer to having a verified Gizmo account. 
    your one time token is ${user.verificationDetails.password}. \n 
    If you did not recently register on Gizmo, Kindly ignore this message.`)
    delete data.verificationDetails.password;
    return new base.Response(201, {
        message: "Account created successfully",
        data,
        error: false,
        jwt
    })
}