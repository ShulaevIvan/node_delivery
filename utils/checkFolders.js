const path = require('path');
const fs = require('fs');

const createPublic = () => {
    const foldersPath = [
        path.join(__dirname, '../', process.env.STATIC_FOLDER),
        path.join(__dirname, '../', process.env.UPLOAD_ADVERTISMNTS_FOLDER)
    ];
    const sessionFolderPath = path.join(__dirname, '../', 'sessions');
    foldersPath.forEach((folder) => {
        if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    });
    fs.readdirSync(sessionFolderPath).forEach((file) => fs.rmSync(`${sessionFolderPath}/${file}`));
    
};


module.exports = createPublic;