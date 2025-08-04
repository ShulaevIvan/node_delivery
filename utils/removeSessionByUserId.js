const path = require('path');
const fs = require('fs');

const removeSessionByUserId = async (userSession) => {
    const userId = userSession.passport.user.data._id;
    const sessionId = userSession.id;
    const sessionFilePath = path.join(__dirname, `../sessions/${sessionId}.json`);
    if (fs.existsSync(sessionFilePath)) {
        fs.unlink(sessionFilePath, err => {
            if (err) throw err;
            console.log(`session ${sessionId} deleted`);
        });
        return `session ${sessionId} deleted, logoff (userID: ${userId})...`;
    }
};

module.exports = removeSessionByUserId;