const router = require('express').Router();
const ChatModule = require('../modules/ChatModule');

router.post('/create-chat', async (req, res) => {
    const { users } = req.body;
    const chat = await ChatModule.createChat(users)
    res.status(201).json({'status': 'ok', data: chat});
});

router.post('/find-chat', async (req, res) => {
    const { users } = req.body;
    const chat = await ChatModule.find(users)
    res.status(200).json({status: 'ok', data: chat});
})


module.exports = router;