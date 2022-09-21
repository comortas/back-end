const communityDao = require('../database/dao/communityDao');
const messages = require('../util/message');

const createNewCommunity = async (communityObj) => {
    try {
        var newCommunity = {
            name: communityObj.name,
            description: communityObj.description,
            createdBy: communityObj.createdBy,
            category: communityObj.category,
            location: communityObj.location,
            latitude: communityObj.latitude,
            longitude: communityObj.longitude
        };

        var community = await communityDao.createCommunity(newCommunity);
        return {
            message: messages.SuccessMessage.CreatedSuccessfully,
            community: community
        }
    } catch (err) {
        throw err;
    }
}

const updateCommunity = async (communityId, newCommunity) => {
    try {
        var updateResult = await communityDao.updateCommunity(communityId, newCommunity);
        if (updateResult.modifiedCount > 0) {
            return {
                message: messages.SuccessMessage.UpdatedSuccessfully
            }
        }
    } catch (error) {
        throw error;
    }
}

const getCommunityById = async (id) => {
    try {
        return await communityDao.getCommunityById(id);
    } catch (err) {
        throw err;
    }
}

const getCommunityList = async () => {
    try {
        return await communityDao.getCommunityList();
    } catch (err) {
        throw err;
    }
}

const deleteCommunityById = async (id) => {
    try {
        await communityDao.deleteCommunityById(id);
        return {
            message: messages.SuccessMessage.DeletedSuccessfully
        }
    } catch (err) {
        throw err;
    }
}


module.exports = {
    createNewCommunity,
    updateCommunity,
    getCommunityList,
    getCommunityById,
    deleteCommunityById
}