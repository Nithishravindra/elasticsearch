import React, { useState } from 'react';
import AWS from 'aws-sdk';
import '../style/app.css';
import axios from 'axios';
// require('dotenv').config()

const S3_BUCKET = 'text-files-bucket-index';
const REGION = 'ap-south-1';

AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION
});

const UploadImageToS3WithNativeSdk = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const uploadFile = async (file) => {
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        if (!file.name.includes('.txt')) {
            alert('not a txt file');
            return;
        }

        const uploader = await myBucket.putObject(params).promise();
        if (uploader.$response.httpResponse.statusCode!== 200) {
            console.log(uploader);
            alert('failed to upload file');
        }
        const handleUpload = async () => {
            const res = await axios.post(
                `http://localhost:3000/api/v1/index/${file.name}`
            );
            console.log('res', res);
            if (res.status === 200) {
                alert('File uploaded and indexed successfully.')
            }
        };

        await handleUpload();
    };

    return (
        <div>
            {/* <div>Native SDK File Upload Progress is {progress}%</div> */}
            <div className="fileUpload">
                <input type="file" onChange={handleFileInput} />
                <button onClick={() => uploadFile(selectedFile)}>
                    {' '}
                    Upload to S3
                </button>
            </div>
        </div>
    );
};

export default UploadImageToS3WithNativeSdk;
