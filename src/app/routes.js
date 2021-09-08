/**
 * 
 * @param {import("express").Express} app 
 * @param {import("passport").PassportStatic} passport 
 */
module.exports = async (app, passport) => {
    app.get('/', (req, res) => {
        res.render('index')
    })
    
    app.get('/login', (req, res) => {
        res.render('index', {
            message: req.flash('loginMessage')
        })
    })

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/main',
        failureRedirect: '/',
        failureFlash: true
    }))

    app.get('/main', isLoggedIn, (req, res)=> {
        // console.log(req.user)
        res.render('main',{
            user: req.user
        })
    })

    function isLoggedIn (req, res, next) {
        if(req.isAuthenticated()){
            console.log(req.isAuthenticated())
            return next()
        }
        return res.redirect('/')
    }
}