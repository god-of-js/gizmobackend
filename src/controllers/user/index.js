const User = require('../../models/user')
const Property = require('../../models/property')
const Token = require('../../services/tokens')
const base = require('../../base')
// const { sms } = require('../../services/twilliomessages')
// const { generateRandom, generateAlphaNumeric } = require('../../services/helpers')
const client = require('twilio');
module.exports.register = async (req) => {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) throw new base.ResponseError(400, 'Name, email, phone and password are compulsory fields')
    const emailExists = await User.findOne({ email })
    const existsNum = await User.findOne({ phone })
    if (emailExists !== null) throw new base.ResponseError(400, 'This email exists in our database already. Try signing in or recovering password')
    if (existsNum !== null) throw new base.ResponseError(400, 'This Phone Number exists in our database already')
    const user = new User({
        name,
        password,
        email,
        phone,
        createdAt: Date.now()
    })
    await user.save().catch((e) => {
        console.log(e);
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
    // sms(phone, `Hooray!!!! \n 
    // You a step closer to having a verified Gizmo account. 
    // your one time token is ${user.verificationDetails.password}. \n 
    // If you did not recently register on Gizmo, Kindly ignore this message.`)
    // delete data.verificationDetails.password;
    return new base.Response(201, {
        message: "Account created successfully",
        data,
        error: false,
        jwt
    })
}
module.exports.deleteAccount = async (req) => {
    const id = req.params.id;
    const user = User.findByIdAndDelete(id).catch(err => {
        throw new base.ResponseError(400, err.message)
    })
    const property = Property.deleteMany({ ownerId: id }).catch(err => {
        throw new base.ResponseError(400, err.message)
    })

    return new base.Response(201, {
        message: "Account created successfully",
        data,
        error: false,
        jwt
    })
}
module.exports.updateAvatar = async (req) => {
    const { id, avatar } = req.body;
    if (!id) throw new base.ResponseError(400, "User Id must be provided")
    if (!avatar) throw new base.ResponseError(400, "Avatar must be provided")
     User.findByIdAndUpdate({ _id: id }, { avatar }).catch(err => {
        throw new base.ResponseError(400, err.message)
    })
    const user = await User.findById(id).exec()
    return new base.Response(201, {
        message: "Avatar added successfully",
        error: false,
        data: user
    })
}