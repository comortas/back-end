const communityDao = require('../database/dao/communityDao');
const constants = require('../util/constants');
const communitySchema = require('../database/models/Community.model')

const createNewCommunity = async (communityObj) => {
    try {
        var newCommunity = new communitySchema({
            name: communityObj.name,
            description: communityObj.description,
            createdBy: communityObj.createdBy,
            categories: communityObj.categories,
            location: communityObj.location,
            latitude: communityObj.latitude,
            longitude: communityObj.longitude
        });

        //await communityDao.createCommunity(newCommunity);
        await newCommunity.save();
        return {
            message: messages(languageCode).SuccessMessage.CannedMessageCreatedSuccessfully
        }
    } catch (err) {
        throw err;
    }
}


module.exports = {
    createNewCommunity
}