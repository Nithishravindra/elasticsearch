const express = require('express');
const elastic = require('./utils/elastic');
const cors = require('cors')
const indexerRouter = require('./router/indexer');
const searcherRouter = require('./router/searcher');
const app = express();

const start = () => {
    app.use(cors())
    app.use('/api/v1/index', indexerRouter);
    app.use('/api/v1/search', searcherRouter);

    const port = 3000;
    app.listen(port, () => {
        console.log(`App running on port ${port} ...`);
    });
};

const main = async () => {
    const isElasticReady = await elastic.checkConnection();
    if (isElasticReady) {
        const elasticIndex = await elastic.esclient.indices.exists({
            index: elastic.elasticIndex
        });
        if (!elasticIndex) {
            await elastic.createIndex();
            await elastic.createMapping();
            await elastic.syncFiles();
        } else {
            console.log('exists');
        }
        start();
    }
};

main();
