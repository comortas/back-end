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


const getUserByEmail = async(email) => {
    try{
        return await models.User.findOne({email : email }).exec();
    }
    catch(error){
        throw error;
    }
}

const updateWallet = async(id) => {
    try{
      return await models.User.findById(id).exec();
    }
    catch(error){
        throw error;
    }
}

const newUpdatedWallet = async (userid, wallet1) => {
    try{
        let user = await models.User.updateOne(
             { _id:userid },
             { $inc: { wallet: wallet1 }} 
          );
        return user;
        }catch(error){
        throw error;
    }
}

module.exports = {
    createNewUser,
    updateUser,
    getuserList,
    getuserById,
    deleteuserById,
    getUserByEmail,
    updateWallet,
    newUpdatedWallet
};