const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: async (req, res, callback) => {
        callback(null, path.join(__dirname, `../${process.env.UPLOAD_ADVERTISMNTS_FOLDER}`));
    },
    filename: (req, file, callback) => {
        callback(null, `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`);
    }
});

const uploadMiddleware = multer({storage});

module.exports = uploadMiddleware;