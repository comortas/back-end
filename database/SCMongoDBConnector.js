const schemas = require('./models');
const DBObjects = require('./DBObjects');

class SCMongoDBConnector {

    constructor(config) {
       // super(config);
    }

    async connect() {
        try {
            const { connection, gridFSBucket } = await super.connect();
            DBObjects.fileAccess.gridFs = gridFSBucket;
            schemas.map((schema) =>{
                DBObjects.models[schema.name] = connection.model(schema.name, schema.schema);
            });
           return {
                connection
            };
        } catch (err) {
            console.error('Failed initialize mongoose middleware', err.message);
            throw new Error(err.message);
        }
    }

}

module.exports = SCMongoDBConnector;