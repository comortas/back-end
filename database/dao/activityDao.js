const { models } = require('../DBObjects');
const _ = require('lodash');
const {ObjectId} = require('mongoose').Types;
const activityModel = require('../models/Activity.model');


const createActivity = async (newActivity) => {
    try{
        let activity = await models.Activity(newActivity);
        await activity.save();
        return activity;
    }catch(error){
        throw error;
    }
}

const updateActivity = async (activityId, newActivity) => {
    try{
        let activity = await  models.Activity.replaceOne({id : activityId }, newActivity);
        return activity;
    }catch(error){
        throw error;
    }
}

const getActivityById = async (id) => {
    try{
        return await models.Activity.findById(id).exec();
    }catch(error){
        throw error;
    }
}

const getActivityList = async () => {
    try{
        return await models.Activity.find().exec();
    }catch(error){
        throw error;
    }
}

const deleteActivityById = async (id) => {
    try{
        return await models.Activity.findByIdAndDelete(id);
    }catch(error){
        throw error;
    }
}

module.exports = {
    createActivity,
    updateActivity,
    getActivityById,
    getActivityList,
    deleteActivityById
};