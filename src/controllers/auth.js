const User = require('../models/user');

module.exports.login = (res) => {
    const {email, password} = res.body;
    let user = User.findOne({email})
    console.log(user)
}