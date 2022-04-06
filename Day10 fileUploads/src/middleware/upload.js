const multer = require('multer')

const req = require('express/lib/request')

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, callback) {
    const uniquepreffix = Date.now()
    callback(null, uniquepreffix + '-' + file.originalname)
  },
})

function fileFilter(req, file, callback) {
  // The function should call `callback` with a boolean
  // to indicate if the file should be accepted

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    // To accept the file pass `true`, like so:
    callback(null, true)
  } else {
    // To reject this file pass `false`, like so:
    callback(new Error('Incorrect mime type'), false)
  }
}

const options = {
  storage: storage,
  fileFilter: fileFilter,
  Limits: {
    filesize: 1024 * 1024 * 5,
  },
}
const Uploads = multer(options)
const uploadFiles = (formkey, method) => {
  return function (req, res, next) {
    let uploadedItems
    if (method == 'single') {
      uploadedItems = Uploads.single(formkey)
    } else if (method == 'multiple') {
      uploadedItems = Uploads.any(formkey)
    }

    return uploadedItem(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(500).send({ message: err.message })
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.status(501).send({ message: err.message })
      }
      // Everything went fine.
      return next()
    })
  }
}
module.exprots = Uploads
