const authHelpers = require("./authHelpers");
const passport = require("passport");

// Отображение страницы регистрации
module.exports.renderRegister = (req, res) => {
    res.render('register')
};

// POST запрос на регистрацию
module.exports.register = async (req, res, next) => {
    return authHelpers.createUser(req, res)
        .then((response) => {
            passport.authenticate('local', (err, user, info) => {
                if (user) {
                    handleResponse(res, 200, 'success');
                }
            })(req, res, next);
        })
        .catch((err) => {
            handleResponse(res, 500, err.detail);
        });
};

// Отображение страницы входа
module.exports.renderLogin = (req, res) => {
    res.render('login')
};

// POST запрос на вход
module.exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            handleResponse(res, 500, err);
        }
        if (!user) {
            handleResponse(res, 404, 'User not found');
        }
        if (user) {
            req.logIn(user, function (err) {
                if (err) {
                    handleResponse(res, 500, err);
                }
                const redirectUrl = req.session.returnTo || '/';
                res.redirect(redirectUrl);
                delete req.session.returnTo;
                handleResponse(res, 200, 'success');
            });
        }
    })(req, res, next);
};


// Выход из аккаунта
module.exports.logout = (req, res) => {
    req.logout();
    handleResponse(res, 200, 'success');
};


function handleResponse(res, code, statusMsg) {
    res.status(code).json({status: statusMsg});
}