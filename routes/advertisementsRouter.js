const router = require('express').Router();
const uploadMiddleware = require('../utils/uploadFile');
const isAuthenticated = require('../utils/isAuthenticated');
const getUserBySession = require('../utils/getUserBySession');
const AdvertisementModule = require('../modules/AdvertisementModule');

router.get('/', async (req, res) => {
    const advData = await AdvertisementModule.get();

    res.status(200).json({ data: advData, status: 'ok' });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const targetAdv = await AdvertisementModule.getById(id);

    res.status(200).json({ data: targetAdv, status: 'ok' })
});

router.post('/', getUserBySession, isAuthenticated, uploadMiddleware.array('images'),  async (req, res) => {
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
});

router.delete('/:id', getUserBySession, isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const userId = req.session.passport.user.data._id;

    const deletedAdv = await AdvertisementModule.remove(id, userId);

    return res.status(200).json({status: 'ok', data: deletedAdv });
});

router.post('/recover', getUserBySession, isAuthenticated, async (req, res) => {
    const { id } = req.query;
    const userId = req.session.passport.user.data._id;

    const recoverAdv = await AdvertisementModule.recover(id, userId);

    return res.status(200).json({status: 'ok', data: recoverAdv });
});


module.exports = router;