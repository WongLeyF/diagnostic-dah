const localStrategy = require('passport-local').Strategy;

const UserSchema = require('../app/models/user.model');

module.exports = (passport) => {
    passport.serializeUser((user, resolve) => {
        resolve(null, user.id)
    })

    passport.deserializeUser((id, resolve) => {
        UserSchema.findById(id, (err, user) => {
            resolve(err, user)
        })
    })

    passport.use('local-login', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, username, password, resolve) => {
        UserSchema.findOne({ username: username }, (err, user) => {
            if (err) return resolve(err);
            if (!user) {
                if (username === 'admin') {
                    const newUser = new UserSchema();
                    newUser.username = 'admin'
                    newUser.password = newUser.generateHash('admin')
                    newUser.save()
                }
                return resolve(null, false, req.flash('loginMessage', 'No se encontro al usuario'))
            }
            if (!user.validatePass(password)) {
                return resolve(null, false, req.flash('loginMessage', 'Contraseña incorrecta'))
            }
            return resolve(null, user)
        })
    }))
}

