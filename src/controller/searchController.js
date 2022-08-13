const elastic = require('../utils/elastic');

const buildQuery = (key, value) => {
    if (value == undefined) {
        return {
        query: {
            match_all: {}
        }
        };
    } else {
        const matchObj = {
        query: { match: {} }
        };
        matchObj.query.match[key] = value;
        return matchObj;
    }
};

exports.query = async (req, res, next) => {
    let query = {};
    if (req.query['title']) {
        query = buildQuery('title', req.query['title']);
    } else if (req.query['body']) {
        query = buildQuery('body', req.query['body']);
    } else {
        query = buildQuery('all', undefined);
    }

    const resultBody = await elastic.esclient.search({
        index: elastic.elasticIndex,
        body: query
    });

    const metadata = [];
    if (resultBody.hits.total.value > 0) {
        for (let i of resultBody.hits.hits) {
        const src = {};
        src['file'] = i._id;
        src['content'] = i._source;
        metadata.push(src);
        }
    }
    const result = {
        totalRecords: resultBody.hits.total.value,
        hits: metadata
    };

    res.status(200).json({
        status: 'Ok',
        data: result
    });
};
