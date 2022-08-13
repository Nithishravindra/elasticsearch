const express = require("express");

const indexerRouter = require("./routes/indexer/index")
const searcherRouter = require("./routes/searcher/index")

const app = express();

app.use('/api/v1/index', indexerRouter)
app.use('/api/v1/search', searcherRouter)

const port = 3000
app.listen(port, () => {
    console.log(`App running on port ${port} ...`);
});