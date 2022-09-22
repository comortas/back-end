const { models } = require('../DBObjects');
const _ = require('lodash');
const { ObjectId } = require('mongoose').Types;


const createNewUser = async (newUser) => {
    try {
        let user = await models.User(newUser);
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

const updateUser = async (userId, newUser) => {
    try {
        let user = await models.User.replaceOne({ id: userId }, newUser);
        return user;
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        return await models.User.findById(id).exec();
    } catch (error) {
        throw error;
    }
}

const getUserList = async () => {
    try {
        return await models.User.find().exec();
    } catch (error) {
        throw error;
    }
}

const deleteUserById = async (id) => {
    try {
        return await models.User.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}


const getUserByEmail = async (email) => {
    try {
        return await models.User.findOne({ email: email }).exec();
    }
    catch (error) {
        throw error;
    }
}

const updateWallet = async (id) => {
    try {
        return await models.User.findById(id).exec();
    }
    catch (error) {
        throw error;
    }
}

const appendWallet = async (volunteerId, timeCredit) => {
    try {
        let user = await models.User.updateOne(
            { _id: volunteerId },
            { $inc: { wallet: timeCredit } }
        );
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createNewUser,
    updateUser,
    getUserList,
    getUserById,
    deleteUserById,
    getUserByEmail,
    updateWallet,
    appendWallet
};