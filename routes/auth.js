const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {development} = require("../knexfile");
const knex = require("knex")(development);
const authHelpers = require('../controllers/authHelpers');

const users = require('../controllers/users');



const options = {};


passport.use(new LocalStrategy(options, (username, password, done) => {
    knex('users').where({username}).first()
        .then((user) => {
            if (!user) return done(null, false);
            if (!authHelpers.comparePass(password, user.password)) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        })
        .catch((err) => {
            return done(err);
        });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    knex('users').where({id}).first()
        .then((user) => { done(null, user); })
        .catch((err) => { done(err, null); });
});



router.route('/register')
    .get(users.renderRegister)
    .post(users.register)


router.route('/login')
    .get(users.renderLogin)
    .post(users.login)

router.get('/logout', authHelpers.loginRequired, users.logout)

router.get('/user', authHelpers.loginRequired, (req, res, next)  => {
    handleResponse(res, 200, 'success');
});

router.get('/admin', authHelpers.adminRequired, (req, res, next)  => {
    handleResponse(res, 200, 'success');
});

router.get('/me', (req, res, next)  => {

    res.status(200).json({id: req.user.id, username: req.user.username, firstname: req.user.firstname});
});


function handleResponse(res, code, statusMsg) {
    res.status(code).json({status: statusMsg});
}

/*router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));*/

module.exports = router;