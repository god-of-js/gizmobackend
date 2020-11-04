const User = require('../../models/user')
const base = require('../../base');
module.exports.getUser = async response => {
    const id = response.params.id;
    const user = await User.findOne({_id: id})
    if(!user) throw new base.ResponseError(404, "This user was not found")
    delete user.password;
    return new base.Response(201, {
        message: "User found",
        data: user,
        error: false
    })
}