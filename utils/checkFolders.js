const path = require('path');
const fs = require('fs');

const createPublic = () => {
    const foldersPath = [
        path.join(__dirname, '../', process.env.STATIC_FOLDER),
        path.join(__dirname, '../', process.env.UPLOAD_ADVERTISMNTS_FOLDER)
    ];
    foldersPath.forEach((folder) => {
        if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    });
};


module.exports = createPublic;