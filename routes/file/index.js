'use strict';

const _ = require('lodash');
const express = require('express');
const router = new express();
const multer = require('multer');
const upload = multer({ dest: '../../uploads' });
const fs = require('fs');
const { ObjectId } = require('mongoose').Types
const reqHandler = require('../../middlewares/reqValidator');
const schemas = require('../../middlewares/reqValidator/schemas/reqSchemas');
const {fileAccess} = require('../../database/DBObjects');

module.exports = async () => {

  //Upload file
  router.post('/file/upload', upload.single('file'), async (req, res, next) => {
    try {

      fs.createReadStream(req.file.path).pipe(
        fileAccess.gridFs.openUploadStream(req.file.originalname, { metadata: { description: req.body.description, title: req.body.title } })).on('error', function (error) {
          throw error;
        }).on('finish', function (data) {
          return res.json(
            {
              fileId: data._id,
              fileName: data.filename,
              fileType: data.contentType,
              fileUrl: `/file/${data._id}`,
              metadata: data.metadata
            });
        });

    } catch (err) {
      return next(err);
    }
  });

  // Download file
  router.get('/file/:fileId', reqHandler(schemas.getFileSchema, 'params'), async (req, res, next) => {
    try {
      fileAccess.gridFs.openDownloadStream(new ObjectId(req.params.fileId)).pipe(res);
    } catch (err) {
      next(err);
    }
  });

  return router;
};