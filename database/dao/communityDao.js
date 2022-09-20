const { models } = require('../DBObjects');
const _ = require('lodash');
const {ObjectId} = require('mongoose').Types;
const communityModel = require('../models/Community.model');


const createCommunity = async (newCommunity) => {
    try{

        let communityObj = communityModel.create(newCommunity);      
        return communityObj;

    }catch(error){
        throw error;
    }
}

module.exports = {
    createCommunity
};