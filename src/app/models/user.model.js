const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const account = new mongoose.Schema({
    username: {type: String},
    password: {type: String}
})

account.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSalt(8, function(err, hash) {
        return (err, hash);
      }), null)
}

account.methods.validatePass = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', account)