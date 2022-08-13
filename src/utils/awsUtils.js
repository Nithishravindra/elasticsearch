const AWS = require('aws-sdk');
require('dotenv').config()

const s3 = new AWS.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});

const BUCKET_NAME = 'text-files-bucket-index';

const listObjectsInBucket = async () => {
    // Create the parameters for calling listObjects
    var bucketParams = {
        Bucket: BUCKET_NAME
    };

    const responseData = await s3.listObjects(bucketParams).promise();
    let files = [];
    for (let fileNames of responseData.Contents) {
        files.push(fileNames.Key);
    }

    return files;
};

const readFileContentsFromS3 = async(file) => {
    const params = { Bucket: BUCKET_NAME, Key: file };
    const data = await s3.getObject(params).promise();

    console.log(data.Body)
    console.log(data.Body.toString())
    return data.Body.toString()
};

module.exports = { 
    listObjectsInBucket,
    readFileContentsFromS3
}