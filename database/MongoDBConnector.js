const schemas = require('./models');
const DBObjects = require('./DBObjects');
const logger = require('../util/logger');
const mongoose = require('mongoose');
class MongoDBConnector {

    async connect(url) {
        mongoose.connect(url)
        .then((connection)=>{
            console.log(`successfully connected`);
            schemas.map((schema) =>{
                DBObjects.models[schema.name] = connection.model(schema.name, schema.schema);
             });
            }).catch((e)=>{
            console.log(`not connected`);
            })
    }
}

module.exports = MongoDBConnector;