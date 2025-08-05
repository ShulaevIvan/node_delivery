const router = require('express').Router();
const uploadMiddleware = require('../utils/uploadFile');
const isAuthenticated = require('../utils/isAuthenticated');
const getUserBySession = require('../utils/getUserBySession');
const AdvertisementModule = require('../modules/AdvertisementModule');

router.get('/', async (req, res) => {
    try {
        const advData = await AdvertisementModule.get();
        res.status(200).json({ data: advData, status: 'ok' });
    }
    catch(err) {
        res.status(500).json({ data: err, status: 'err' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const targetAdv = await AdvertisementModule.getById(id);

        res.status(200).json({ data: targetAdv, status: 'ok' });
    }
    catch(err) {
        res.status(500).json({ data: err, status: 'err' });
    }   
});

router.post('/', getUserBySession, isAuthenticated, uploadMiddleware.array('images'),  async (req, res) => {
    try {
        const files = req.files;
        const { shortTitle, description } = req.body;
        if (!files || files.length === 0) {
            return res.status(200).json({ status: 'files not included' });
        }
        const data = {
            email: req.session.passport.user.data.email,
            name: req.session.passport.user.data.name,
            shortTitle: shortTitle,
            description: description,
            files: files
        };
        const createdAdv = await AdvertisementModule.create(data);
    
        return res.status(201).json({ status: 'ok', data: createdAdv });
    }
    catch(err) {
        return res.status(500).json({ status: 'err', data: err });
    }
    
});

router.delete('/:id', getUserBySession, isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.data._id;

        const deletedAdv = await AdvertisementModule.remove(id, userId);

        return res.status(200).json({status: 'ok', data: deletedAdv });
    }
    catch(err) {
        return res.status(500).json({status: 'err', data: err });
    }
});

router.post('/recover', getUserBySession, isAuthenticated, async (req, res) => {
    try {
        const { id } = req.query;
        const userId = req.user.data._id;

        const recoverAdv = await AdvertisementModule.recover(id, userId);

        return res.status(201).json({status: 'ok', data: recoverAdv });
    }
    catch(err) {
        return res.status(500).json({status: 'err', data: err });
    }
});


module.exports = router;