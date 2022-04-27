const bcrypt = require("bcrypt");
const {development} = require("../knexfile");
const knex = require("knex")(development);

// Функция сравнения паролей
function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}

// Функция создания пользователя
function createUser(req, res) {
    return handleErrors(req)
        .then(() => {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(req.body.password, salt);
            return knex('users')
                .insert({
                    username: req.body.username,
                    email: req.body.email,
                    firstname: req.body.firstname,
                    password: hash
                })
                .returning('*');
        }).catch((err) => {
            res.status(400).json({status: err.message});
        });
}

// Функция перенаправления на страницу входа, для страниц где вход необходим
function loginRequired(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first');
        return res.redirect('/login');
    }
    next();
}

// Функция проверяет админ ты или нет
function adminRequired(req, res, next) {
    if (!req.user) res.status(401).json({status: 'Please log in'});
    return knex('users').where({username: req.user.username}).first()
        .then((user) => {
            if (!user.admin) res.status(401).json({status: 'You are not authorized'});
            return next();
        })
        .catch((err) => {
            res.status(500).json({status: 'Something bad happened'});
        });
}

// Функция перенаправления после входа в аккаунт (не работает почему-то)
function loginRedirect(req, res, next) {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/';
    res.redirect(redirectUrl);
    delete req.session.returnTo;
}


// Функция обработки ошибок
function handleErrors(req) {
    return new Promise((resolve, reject) => {
        if (req.body.username.length < 6) {
            reject({
                message: 'Username must be longer than 6 characters'
            });
        } else if (req.body.password.length < 6) {
            reject({
                message: 'Password must be longer than 6 characters'
            });
        } else {
            resolve();
        }
    });
}


module.exports = {
    comparePass, createUser, loginRequired, adminRequired, loginRedirect
};
