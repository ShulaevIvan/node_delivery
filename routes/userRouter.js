const router = require('express').Router();
const passport = require('passport');
const UserModule = require('../modules/UserModule');
const hashPassword = require('../utils/hashPassword');


router.get('/all-users', async (req, res) => {
    await UserModule.getAllUsers()
    .then((allUsers) => {
        res.status(200).json({data: allUsers});
    })
    
});

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

router.post('/signin', passport.authenticate('local'), async (req, res, next) => {
    req.login(req.user, (err) => {
        if (err) { return next(err); }
        return res.status(200).json(req.user);
    });
});

router.post('/logout', async (req, res) => {
    if (req.isAuthenticated()) {
        req.logOut();
    }
});

router.get('/', async (req, res) => {
    return res.status(200).json({'status': 'sok'});
})

module.exports = router;