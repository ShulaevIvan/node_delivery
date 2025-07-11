const router = require('express').Router();
const passport = require('passport');
const UserModule = require('../modules/UserModule');
const hashPassword = require('../utils/hashPassword');
const isAuthenticated = require('../utils/isAuthenticated');

router.post('/signup', async (req, res) => {
     try {
        const data = req.body;
        await hashPassword(data.password)
        .then((hashPassword) => {
            const userData = {
                email: data.email,
                name: data.name,
                contactPhone: data.contactPhone,
                passwordHash: hashPassword,
            };
            UserModule.create(userData)
            .then((userObj) => {
               return res.status(201).json({'status': 'ok', data: userObj});
            })
            .catch((err) => {
                return res.status(201).json({'status': 'err', data: err.message});
            })
        });
    }
    catch(err) {
        res.status(500).json({'status': 'err', 'message':'server err'});
    }
});

router.post('/signin', passport.authenticate('local'), (req, res) => {
    console.log(req.user)
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
});

router.post('/logout', async (req, res) => {
    if (req.isAuthenticated()) {
    }
});

router.get('/', async (req, res) => {
    return res.status(200).json({'status': 'sok'});
})

module.exports = router;