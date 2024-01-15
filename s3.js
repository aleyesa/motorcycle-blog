require('dotenv').config();

const S3 = require('aws-sdk/clients/s3');
const fs = require("fs");

const accessKeyId = process.env.S3_BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.S3_BUCKET_ACCESS_SECRET;
const region = process.env.S3_BUCKET_REGION;
const bucketName = process.env.S3_BUCKET_NAME

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

function uploadFile(file) {
    let fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucketName,
        Key: file.filename,
        Body: fileStream
    }

    return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

function getFileStream(filekey) {
    const downloadParams = {
        Bucket: bucketName,
        Key: filekey
    }


    let fileStream = s3.getObject(downloadParams).createReadStream();
    return fileStream;
}
exports.getFileStream = getFileStream;

function listObjects() {
    const params = {
        Bucket: bucketName
    
    }
    return s3.listObjectsV2(params).promise();
}
exports.listObjects = listObjects;

function deleteObjects(imageName) {
    const params = {
        Bucket: bucketName,
        Key: imageName
    }
    return s3.deleteObject(params).promise();
}
exports.deleteObjects = deleteObjects;