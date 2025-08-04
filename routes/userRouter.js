const router = require('express').Router();
const passport = require('passport');
const UserModule = require('../modules/UserModule');
const hashPassword = require('../utils/hashPassword');
const getUserBySession = require('../utils/getUserBySession');
const isAuthenticated = require('../utils/isAuthenticated');
const removeSessionByUserId = require('../utils/removeSessionByUserId');


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
        res.status(500).json({'status': 'err', 'message':'unexpected error'});
    }
});

router.post('/signin', passport.authenticate('local'), async (req, res, next) => {
    try {
        return req.login(req.user, (err) => {
            if (err) { return next(err); }
            return res.status(200).json(req.user);
        });
    }
    catch(err) {
        return res.status(500).json(null);
    }
   
});

router.get('/logout', getUserBySession, isAuthenticated, async (req, res) => {
    try {
        const status = await removeSessionByUserId(req.session);
        req.logout(function(err) {
            if (err) { return next(err); }
            res.status(200).json({'message': status});
        });
    }
    catch(err) {
        return res.status(500).json({ message: 'unexpected error' });
    }
});

router.get('/all-users', async (req, res) => {
    try {
        const users = await UserModule.getAllUsers();
        res.status(200).json({data: users});
    }
    catch(err) {
        res.status(500).json({ data: [], message: 'unexpected error' });
    }
});

router.get('/find-user', getUserBySession, isAuthenticated, async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(200).json({user: [], message: 'param not found'});
        }
        const targetUser = await UserModule.findByEmail(email);

        return res.status(200).json({user: targetUser});
    }
    catch(err) {
        res.status(500).json({data: [], message: 'unexpected error'});
    }
});

module.exports = router;