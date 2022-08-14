# ElasticSearch in NodeJs

A full stack application that can search documents in AWS S3 using Elasticsearch built using Node, Express and React.

## Tech stack
- NodeJs
- ReactJs
- Express 
- ElasticSearch
- AWS S3
 
## Overview

An overview of top-level files/directories in project.


    ├── backend 
        ├──src
            ├── src 
                ├── controller
                    ├── indexerController.js
                    ├── searchController.js
                ├── router
                    ├── indexer.js
                    ├── searcher.js
                ├── utils 
                    ├── awsUtils.js
                    ├── elastic.js
                ├── index.js 
        ├──Dockerfile
    ├── frontend
        ├──src
            ├── src 
                ├── components
                    ├── Card.js
                    ├── FileUpload.js
                    ├── Search.js
                ├── style
                    ├── app.css
                ├── App.js
                ├── index.js 
    ├── .gitignore
    ├── .prettierrc
    └── README.md

## Development
- API is built using Node/Express.
- Elasticsearch index and mapping would be created once app starts.
- APIs are dockerizied.
- Refer the postman collection to view API contracts.

## Run locally
- Start elasticsearch cluster and ensure that it is running on port 9200.
-  Create S3 bucket, and  get access and secret keys from AWS.
- Ensure docker is running locally and execute the following commands
  - ```cd backend docker build -t {AccName}/apis .```
  - ``` docker run -e accessKeyId={} -e secretAccessKey={}  -p 3000:3000 {AccName}/apis```
- The above commands are going to start your apis. 
- ```cd frontend; npm install; npm run start``` will spin the UI.

