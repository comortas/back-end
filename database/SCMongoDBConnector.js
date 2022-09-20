const schemas = require('./models');
const DBObjects = require('./DBObjects');
const logger = require('../util/logger');
class SCMongoDBConnector {

    async connect(url) {
        var mongoClient = require("mongodb").MongoClient;
        mongoClient.connect(url)
        .then((db)=>{
            console.log(`successfully connected`);
            // schemas.map((schema) =>{
            //     DBObjects.models[schema.name] = db.model(schema.name, schema.schema);
            //  });
            }).catch((e)=>{
            console.log(`not connected`);
            })
        // mongoClient.connect(url, function (err, db) {
        //     if(err){
        //         logger.info("Unable to connect to the database:", err);
        //     }else {
        //         // schemas.map((schema) =>{
        //         //     DBObjects.models[schema.name] = db.model(schema.name, schema.schema);
        //         // });
        //         logger.info("Database Connection has been established successfully.");
        //     }
        //     //db.close();
        // });
    }
}

module.exports = SCMongoDBConnector;