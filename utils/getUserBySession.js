const path = require('path');
const fs = require('fs');

const getUserBySession = async (req, res, next) => {
    const sessionId = req.session.id;
    const sessionFilePath = path.join(__dirname, `../sessions/${sessionId}.json`);
    if (fs.existsSync(sessionFilePath)) {
        const sessionData = require(`../sessions/${sessionId}.json`);
        const userData = sessionData.passport.user;
        req.login(userData, (err) => {
            if (err) { return next(err); }
            next();
        });
    }
    
    return 'test 23123'
};


module.exports = getUserBySession;