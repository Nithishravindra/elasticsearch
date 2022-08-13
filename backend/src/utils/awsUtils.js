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
    try {
        const params = { Bucket: BUCKET_NAME, Key: file };
        const data = await s3.getObject(params).promise();
        return data.Body.toString()
    } catch(err) {
        console.log(err)
        return err
    }
};

module.exports = { 
    listObjectsInBucket,
    readFileContentsFromS3
}