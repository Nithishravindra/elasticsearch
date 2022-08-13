const { Client } = require('@elastic/elasticsearch');
const fs = require('fs');
const util = require('util');
const elasticUrl = 'http://localhost:9200';
const request = require('request-promise-native');
const esclient = new Client({ node: elasticUrl });
const elasticIndex = 'quote';
const type = 'text';

const checkConnection = () => {
    return new Promise(async (resolve) => {
        console.log('Checking connection to ElasticSearch...');
        let isConnected = false;

        while (!isConnected) {
            try {
                await esclient.cluster.health({});
                console.log(
                    'Successfully connected to ElasticSearch'
                );
                isConnected = true;

                // eslint-disable-next-line no-empty
            } catch (_) {}
        }
        resolve(true);
    });
};

const createIndex = async () => {
    const index = await esclient.indices.create({
        index: elasticIndex
    });
    console.log(index);
    if (index.acknowledged) {
        console.log(`Created index ${elasticIndex}`);
        return true;
    } else {
        console.log(`Failed to create index. ${index}`);
        return false;
    }
};

const createMapping = async () => {
    try {
        const schema = {
            title: {
                type: 'text',
                analyzer: 'standard'
            },
            body: {
                type: 'text'
            }
        };

        await esclient.indices.putMapping({
            index: elasticIndex,
            type,
            include_type_name: true,
            body: {
                properties: schema
            }
        });

        console.log('Quotes mapping created successfully');
    } catch (err) {
        console.error(
            'An error occurred while setting the quotes mapping:'
        );
        console.error(err);
    }
};

const syncFiles = async () => {
    let files = [
        '60052-0.txt',
        '60062-0.txt',
        '60063-0.txt',
        'pg60060.txt'
    ];
    const readFile = util.promisify(fs.readFile);

    files.forEach(async (f) => {
        let book = await readFile(
            '/Users/nithishr/c/elasticsearch-node/src/books/' + f
        );
        [title, ...body] = book.toString().split('\n');
        try {
            let result = await indexBook(f, title, body);
            console.log('Indexing result: ', result);
        } catch (err) {
            console.log('ERROR: ', err);
        }
    });
};

async function indexBook(fid, title, body) {
    let url = 'http://localhost:9200/quote/_doc/' + fid;
    let payload = {
        url: url,
        body: {
            title: title,
            body: body.join('\n')
        },
        json: true
    };
    return request.put(payload);
}
module.exports = {
    checkConnection,
    createIndex,
    createMapping,
    syncFiles,
    esclient,
    elasticIndex
};
