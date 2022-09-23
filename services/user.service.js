const userDao = require('../database/dao/userDao');
const messages = require('../util/message');
const logger = require('../util/logger');
const user = require('../routes/user');
const constant = require('../util/constants');
const activityDao = require('../database/dao/activityDao');


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

const updateWallet = async (obj) => {
    try {
        //update activity obj
        var activity = await activityDao.getActivityById(obj.activityId);
        activity.volunteers.find(element => {
            if (element.volunteerId == obj.volunteerId) {
                element.requestStatus = obj.reqStatus;
                return true
            }
            else { return false }
        });
        await activityDao.updateActivity(obj.activityId, activity);

        //update user obj
        if (obj.reqStatus == constant.ACTIVITY_REQUEST_STATUS.CREDIT_APPROVED) {
            var updateResult = await userDao.appendWallet(obj.volunteerId, obj.timeCredit);
            if (updateResult.modifiedCount > 0) {
                return {
                    message: messages.SuccessMessage.CreditApproved
                }
            }
        } else if (obj.reqStatus == constant.ACTIVITY_REQUEST_STATUS.CREDIT_DENIED) {
            return {
                message: messages.SuccessMessage.CreditDenied
            }
        }

    } catch (err) {
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