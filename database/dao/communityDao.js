const { models } = require('../DBObjects');
const _ = require('lodash');
const {ObjectId} = require('mongoose').Types;
const communityModel = require('../models/Community.model');


const createCommunity = async (newCommunity) => {
    try{
        let community = await models.Community(newCommunity);
        await community.save();
        return community;
    }catch(error){
        throw error;
    }
}

const updateCommunity = async (communityId, newCommunity) => {
    try{
        let community = await  models.Community.replaceOne({id : communityId }, newCommunity);
        return community;
    }catch(error){
        throw error;
    }
}

const getCommunityById = async (id) => {
    try{
        return await models.Community.findById(id).exec();
    }catch(error){
        throw error;
    }
}

const getCommunityList = async () => {
    try{
        return await models.Community.find().exec();
    }catch(error){
        throw error;
    }
}

const deleteCommunityById = async (id) => {
    try{
        return await models.Community.findByIdAndDelete(id);
    }catch(error){
        throw error;
    }
}

module.exports = {
    createCommunity,
    updateCommunity,
    getCommunityById,
    getCommunityList,
    deleteCommunityById
};