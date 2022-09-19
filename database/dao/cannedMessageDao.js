const { models } = require('../DBObjects');
const _ = require('lodash');
const {ObjectId} = require('mongoose').Types;

const getCannedMessageByTitle = async (cannedMessageTitle) => {
    try {
        return await models.CannedMessage.findOne({ 'title' : cannedMessageTitle });
    } catch (error) {
        throw error;
    }
}

const getAllCannedMessages = async(organization) => {
    try{
        if(organization){
            return await models.CannedMessage.find({'organization' : organization}).populate('organization').populate('clinicLocation');
        }else{
            return await models.CannedMessage.find().populate('organization').populate('clinicLocation');
        }
    }catch(error){
        throw error;
    }
}

const getCannedMessageByCategory = async (cannedMessageCategory) => {
    try {
        return await models.CannedMessage.find({ 'category' : cannedMessageCategory });
    } catch (error) {
        throw error;
    }
}

const getCannedMessage = async (organization,clinicLocation,role) => {
    try{
        return await models.CannedMessage.find({
            'organization' : organization ,
            'clinicLocation' : { $in : [clinicLocation]} , 
            'associatedTo' : { $in : [role]}
        }).select([
            'message'
        ]).lean();

    }catch (error) {
        throw error;
    }
}

const getCannedMessagesByOrganization = async (organization,role) => {
    try{
        return await models.CannedMessage.find({'organization' :organization ,'associatedTo' : role })
    }catch (error) {
        throw error;
    }
}

const createCannedMessage = async (cannedMessage) => {
    try{

        let message = new models.CannedMessage(cannedMessage);
        await message.validate();
        await message.save();
        return message;

    }catch(error){
        throw error;
    }
}

const updateCannedMessage  = async (id,cannedMessage) => {
    try {
        return await models.CannedMessage.updateOne({"_id" : id},cannedMessage);
    }
    catch (error) {
        throw error;
    }
};

const deleteCannedMessage = async (id)=>{
    try{
        return await models.CannedMessage.deleteOne({"_id":id});
    } catch( error){
        throw error;
    }
}

const getAllCannedMessagesSub = async(organization,associatedTo) => {
    try{
        if(!_.isEmpty(associatedTo)||!_.isEmpty(organization)){
            let query = [];
            if(!_.isEmpty(organization)){
                let org =_.map(organization,function (id) {return ObjectId(id);})
                query.push({organization:{$in:org}});
            }
            if(!_.isEmpty(associatedTo)){
                query.push({associatedTo: {$in:associatedTo}});
            }
            return await models.CannedMessage.find({$and:query}).populate('organization').populate('clinicLocation');
        }else{
            return await models.CannedMessage.find().populate('organization').populate('clinicLocation');
        }
    }catch(error){
        throw error;
    }
}

module.exports = {
    getCannedMessageByTitle,
    getAllCannedMessages,
    getCannedMessageByCategory,
    getCannedMessagesByOrganization,
    getCannedMessage,
    createCannedMessage,
    updateCannedMessage,
    deleteCannedMessage,
    getAllCannedMessagesSub
};