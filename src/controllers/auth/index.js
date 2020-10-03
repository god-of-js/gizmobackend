const User = require('../../models/user');
const base = require('../../base');
const Token = require('../../services/tokens');

module.exports.login = async (res) => {
    const {email, password} = res.body;
    if(!email || !password) throw new base.ResponseError(400, "Email and password must be provided.")
    const user = await User.findOne({email});
    if (!user) throw new base.ResponseError(404, "This email was not found");
    if(password !== user.password) throw new base.ResponseError(401, "Email and password must be provided.")
    const jwt = Token.create({
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        phone: user.phone,
        purpose: 'Verification'
    },
        { expiresIn: '7d', issuer: 'Blue-streak' }
    )
    delete user.password
    return new base.Response(200, {
        message: 'User logged in successfully',
        data: user,
        error: false,
        jwt
    })
}