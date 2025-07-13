const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const UserModule = require('../modules/UserModule');

passport.serializeUser(async (user, done) => {
    // console.log('Сериализация');
    done(null, user);
});

passport.deserializeUser(async (email, done) => {
    // console.log('Десериализация');
    await UserModule.findByEmail(email)
    .then((targetUser) => {
        const user = targetUser ? targetUser : false;
        done(null, user);
    });
});

passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
    try {
        await UserModule.findByEmail(email)
        .then((targetUser) => {
            bcrypt.compare(password, targetUser.passwordHash, (err, checkResult) => {
                if (checkResult) return done(null, {data: targetUser, status: 'ok'});
                return done(null, {error: 'Неверный логин или пароль' , status: 'error'});
            });
        })
        .catch(() => {
            return done(null, {error: 'Неверный логин или пароль' , status: 'error'});
        });
    }
    catch(err) {
        console.log(err)
        return done(null, err);
    }
}));