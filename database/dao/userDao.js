const { models } = require('../DBObjects');
const _ = require('lodash');
const {ObjectId} = require('mongoose').Types;


const createNewUser = async (newUser) => {
    try{
        let user = await models.User(newUser);
        await user.save();
        return user;
    }catch(error){
        throw error;
    }
}

const updateUser = async (userId, newuser) => {
    try{
        let user = await models.User.replaceOne({id : userId }, newuser);
        return user;
    }catch(error){
        throw error;
    }
}

const getuserById = async (id) => {
    try{
        return await models.User.findById(id).exec();
    }catch(error){
        throw error;
    }
}

const getuserList = async () => {
    try{
        return await models.User.find().exec();
    }catch(error){
        throw error;
    }
}

const deleteuserById = async (id) => {
    try{
        return await models.User.findByIdAndDelete(id);
    }catch(error){
        throw error;
    }
}


const getuserByEmail = async(email) => {
    try{
        return await models.User.find(email).exec();
    }
    catch(error){
        throw error;
    }
}

module.exports = {
    createNewUser,
    updateUser,
    getuserList,
    getuserById,
    deleteuserById,
    getuserByEmail
};