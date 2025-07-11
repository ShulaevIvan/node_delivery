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
    await UserModule.findByEmail(email)
        .then((targetUser) => {
            console.log(targetUser)
            bcrypt.compare(password, targetUser[0].passwordHash, (err, checkResult) => {
                if (checkResult) return done(null, targetUser[0]);
                else return done(null, false);
            });
        })
        .catch(() => {
            return done(null, false);
    });
}));