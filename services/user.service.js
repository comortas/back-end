const userDao = require('../database/dao/userDao');
const messages = require('../util/message');

const createNewUser = async (userObj) => {
    try {
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
    } catch (err) {
        throw err;
    }
}

const updateUser = async (userId, newuser) => {
    try {
        var updateResult = await userDao.updateUser(userId, newuser);
        if (updateResult.modifiedCount > 0) {
            return {
                message: messages.SuccessMessage.UpdatedSuccessfully
            }
        }
    } catch (error) {
        throw error;
    }
}

const getuserById = async (id) => {
    try {
        return await userDao.getuserById(id);
    } catch (err) {
        throw err;
    }
}

const getuserList = async () => {
    try {
        return await userDao.getuserList();
    } catch (err) {
        throw err;
    }
}

const deleteuserById = async (id) => {
    try {
        await userDao.deleteuserById(id);
        return {
            message: messages.SuccessMessage.DeletedSuccessfully
        }
    } catch (err) {
        throw err;
    }
}


module.exports = {
    createNewUser,
    updateUser,
    getuserList,
    getuserById,
    deleteuserById
}