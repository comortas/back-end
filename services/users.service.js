const usersDao = require('../database/dao/usersDao')
const constants = require('../util/constants');
const messages = require('../util/message-util');
//const MDSessionHandler = require('../helpers/MDSessionHandler');


const getAllUsers = async (name) => {
    try
    {
        return await usersDao.getAllUsers(name);
    }
    catch (err)
    {
        throw err;
    }
};