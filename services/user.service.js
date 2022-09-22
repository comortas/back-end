const userDao = require('../database/dao/userDao');
const messages = require('../util/message');
const logger = require('../util/logger');
const { find } = require('lodash');
const user = require('../routes/user');


const createNewUser = async (userObj) => {
    try {
        //check email already exist
        var userDetails = await userDao.getUserByEmail(userObj.email);
        logger.info(JSON.stringify(userDetails));
        if (userDetails) {
            return {
                message: messages.SuccessMessage.CreatedSuccessfully,
                user: userDetails
            }
        } else {
            var newUser = {
                name: userObj.name,
                email: userObj.email,
                phone: null,
                wallet: 0,
                profilePicture: userObj.picture
            };
            var user = await userDao.createNewUser(newUser);
            return {
                message: messages.SuccessMessage.CreatedSuccessfully,
                user: user
            }
        }

    } catch (err) {
        throw err;
    }
}



const updateUser = async (userId, newUser) => {
    try {
        var updateResult = await userDao.updateUser(userId, newUser);
        if (updateResult.modifiedCount > 0) {
            return {
                message: messages.SuccessMessage.UpdatedSuccessfully
            }
        }
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        return await userDao.getUserById(id);
    } catch (err) {
        throw err;
    }
}

const getUserList = async () => {
    try {
        return await userDao.getUserList();
    } catch (err) {
        throw err;
    }
}

const deleteUserById = async (id) => {
    try {
        await userDao.deleteUserById(id);
        return {
            message: messages.SuccessMessage.DeletedSuccessfully
        }
    } catch (err) {
        throw err;
    }
}

const updateWallet = async(obj) => {
    try{
       var updateResult = await userDao.appendWallet(obj.volunteerId, obj.timeCredit);
       if (updateResult.modifiedCount > 0) {
           return {
               message: messages.SuccessMessage.UpdatedSuccessfully
           }
        }
       
    }catch (err) {
        throw err;
    }
}

module.exports = {
    createNewUser,
    updateUser,
    getUserList,
    getUserById,
    deleteUserById,
    updateWallet
}