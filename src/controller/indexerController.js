const elastic = require('../utils/elastic');
const AWSUtils = require('../utils/awsUtils');

exports.indexTextFile = async (req, res, next) => {
    let file = req.params.fileName;
    if (!file.includes('txt')) {
        return res.status(400).json({
            status: 'Bad Request',
            msg: 'enter valid txt file'
        });
    }
    const data = await AWSUtils.readFileContentsFromS3(file);
    if (data.statusCode === 404) {
        return res.status(400).json({
            status: 'Bad Request',
            msg: 'file does not exists'
        });
    }
    let [title, ...body] = data.toString().split('\n');
    const indexerResponse = await elastic.IndexRecord(
        file,
        title,
        body
    );
    res.status(200).json({
        status: 'Ok',
        _id: indexerResponse._id,
        msg: indexerResponse.result
    });
};
