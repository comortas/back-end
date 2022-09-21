const { models } = require('../DBObjects');
const _ = require('lodash');
//const {ObjectId} = require('mongoose').Types;

const getAllUsers = async (name) => {
    try {
        return await models.users.findOne({ 'Name' : name });
    } catch (error) {
        throw error;
    }
};


module.exports = {
    getAllUsers
};