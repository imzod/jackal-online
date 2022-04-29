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
                    req.logIn(user, function (err) {
                        return err
                            ? next(err)
                            : res.redirect('/');
                    });
                }
            })(req, res, next);
        })
        .catch((err) => {
            req.flash("error", err.detail);
            res.redirect("/register");
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
            req.flash("error", err);
            res.redirect('/login');
        }
        if (!user) {
            req.flash("error", 'User not found');
            res.redirect('/login');
        }
        if (user) {
            req.logIn(user, function (err) {
                if (err) {
                    req.flash("error", err);
                    res.redirect('/login');
                }
                req.flash("success", "Welcome to the game!")
                const redirectUrl = req.session.returnTo || '/';
                delete req.session.returnTo;
                res.redirect(redirectUrl);
            });
        }
    })(req, res, next);
};


// Выход из аккаунта
module.exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "До свидания!");
    res.redirect('/login');
};


function handleResponse(res, code, statusMsg) {
    res.status(code).json({status: statusMsg});
}