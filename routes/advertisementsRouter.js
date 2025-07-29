const router = require('express').Router();
const passport = require('passport');
const uploadMiddleware = require('../utils/uploadFile');
const isAuthenticated = require('../utils/isAuthenticated');
const AdvertisementModule = require('../modules/AdvertisementModule');

router.get('/', (req, res) => {
    const advData = AdvertisementModule.get();

    res.status(200).json({data: advData, 'status': 'ok'});
});

router.get('/:id', (req, res) => {

});

router.post('/', uploadMiddleware.array('images'),  async (req, res) => {
    const files = req.files;
    const { shortTitle, description } = req.body;
    passport.authenticate('local')
    console.log(req.user)
    if (!files || files.length === 0) {
        return res.status(200).json({status: 'bad'});
    }
    if (!req.isAuthenticated()) {
        return res.status(200).json({status: 'not auth'});
    }
    const data = {
        email: req.session.passport.user.email,
        name: req.session.passport.user.name,
        shortTitle: shortTitle,
        description: description,
        files: files
    };
    const createdAdv = await AdvertisementModule.create(data);
    return res.status(201).json({status: 'ok'});
});

router.delete('/', (req, res) => {

});

module.exports = router;