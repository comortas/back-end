const cannedMessageDao = require('../database/dao/cannedMessageDao');
const constants = require('../util/constants');
const messages = require('../util/message-util');
const MDSessionHandler = require('../helpers/MDSessionHandler');

const getAllCannedMessages = async (role,userOrganization,queryOrganization) => {
    try{
        let organization;
        if(role == constants.Role.SuperAdmin){
            organization = queryOrganization
        }else {
            organization = userOrganization
        }
        return await cannedMessageDao.getAllCannedMessages(organization);
    }catch(err){
        throw err;
    }
}

const getCannedMessageByTitle = async (title) => {
    try{
        return await cannedMessageDao.getCannedMessageByTitle(title);
    }catch (err) {
        throw err;
    }
}

const getCannedMessageByCategory = async (category) => {
    try{
        return await cannedMessageDao.getCannedMessageByCategory(category);
    }catch (err) {
        throw err;
    }
}

const getCannedMessage = async (userId) => {
    try{
        // const user = await userDao.getUserById(userId);
        const user = await MDSessionHandler.makeAPICall('GET', `${process.env.APPLICATION_URL}/api/telehealth/user-management/user/info/${userId}`, null);
        let role;
        if(user.userType == constants.Role.Provider){
            role = 'Provider'
        }else if(user.userType == constants.Role.MedicalAssistant){
            role = 'MedicalAssistant'
        }
        return await cannedMessageDao.getCannedMessage(user.organization,user.clinicLocation,role);
    }catch (err) {
        throw err;
    }
}

const getCannedMessagesByOrganization = async (userId) => {
    try{
        // const user = await userDao.getUserById(userId);
        const user = await MDSessionHandler.makeAPICall('GET', `${process.env.APPLICATION_URL}/api/telehealth/user-management/user/info/${userId}`, null);
        let role;
        if(user.userType == constants.Role.Provider){
            role = 'Provider'
        }else if(user.userType == constants.Role.MedicalAssistant){
            role = 'MedicalAssistant'
        }
        return await cannedMessageDao.getCannedMessagesByOrganization(user.organization,role);

    }catch (err) {
        throw err;
    }
}

const createCannedMessage = async (languageCode,userId,cannedMessage) => {
    try{

        cannedMessage.createdBy = userId;
        await cannedMessageDao.createCannedMessage(cannedMessage);
        return {
            message : messages(languageCode).SuccessMessage.CannedMessageCreatedSuccessfully
        }

    }catch (err){
        throw err;
    }
}

const updateCannedMessage = async(languageCode,userId,id,cannedMessage) => {
    try{

        cannedMessage.updatedBy = userId;
        await cannedMessageDao.updateCannedMessage(id,cannedMessage)
        return{
            message : messages(languageCode).SuccessMessage.CannedMessageUpdatedSuccessfully
        } 

    }catch(err){
        throw err;
    }
}

const deleteCannedMessage = async(languageCode,id) => {
    try{
        
        await cannedMessageDao.deleteCannedMessage(id);
        return{
            message : messages(languageCode).SuccessMessage.CannedMessageDeletedSuccessfully
        }
    } catch(err){
        throw err;
    }
}

const getAllCannedMessagesSub = async (role,userOrganization,organizations,associatedTo) => {
    try{
        let organization=[];
        if(role == constants.Role.SuperAdmin){
            organization=organizations;
        }else {
            organization.push(userOrganization)
        }
        return await cannedMessageDao.getAllCannedMessagesSub(organization,associatedTo);
    }catch(err){
        throw err;
    }
}

module.exports = {
    getAllCannedMessages,
    getCannedMessageByTitle,
    getCannedMessageByCategory,
    getCannedMessagesByOrganization,
    getCannedMessage,
    createCannedMessage,
    updateCannedMessage,
    deleteCannedMessage,
    getAllCannedMessagesSub
}