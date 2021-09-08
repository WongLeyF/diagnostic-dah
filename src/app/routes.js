/**
 * 
 * @param {import("express").Express} app 
 * @param {import("passport").PassportStatic} passport 
 */
module.exports = async (app, passport) => {
    
    app.get('/', (req, res) => {
        res.render('index', {
            message: 'noMSG'
        })
    })
    
    app.get('/login', (req, res) => {
        res.render('index', {
            message: req.flash('loginMessage')
        })
    })

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/main',
        failureRedirect: '/login',
        failureFlash: true
    }))

    app.get('/main', isLoggedIn, (req, res)=> {
        res.render('main',{
            user: req.user
        })
    })

    app.get('/logout', (req, res) =>{
        req.logout()
        res.redirect('/')
    })

    function isLoggedIn (req, res, next) {
        if(req.isAuthenticated()){
            console.log(req.isAuthenticated())
            return next()
        }
        return res.redirect('/')
    }
}