const multer = require('multer');
const { UPLOAD_DIR } = require('../config');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}_${req.user.id}${ext}`);
  },
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('audio/')) cb(null, true);
  else cb(new Error('Somente arquivos de áudio são permitidos'), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 20 * 1024 * 1024 } });

module.exports = upload;
