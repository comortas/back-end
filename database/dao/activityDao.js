const { models } = require('../DBObjects');
const _ = require('lodash');
const { ObjectId } = require('mongoose').Types;
const logger = require('../../util/logger');
const { json } = require('express');

const createActivity = async (newActivity) => {
    try {
        let activity = await models.Activity(newActivity);
        await activity.save();
        return activity;
    } catch (error) {
        throw error;
    }
}

const updateActivity = async (activityId, newActivity) => {
    try {
        let activity = await models.Activity.replaceOne({ id: activityId }, newActivity);
        return activity;
    } catch (error) {
        throw error;
    }
}

const getActivityById = async (id) => {
    try {
        return await models.Activity.findById(id).exec();
    } catch (error) {
        throw error;
    }
}

const getActivityList = async () => {
    try {
        return await models.Activity.find().exec();
    } catch (error) {
        throw error;
    }
}

const deleteActivityById = async (id) => {
    try {
        return await models.Activity.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}
// const getVolunteerByActivityAndUserId = async (activityId, volunteerId) => {
//     try {
//         models.Activity.find({id:activityId,'volunteers.id':volunteerId}, function(err, foundLinks){
//             if(err){
//                 logger.error(err);
//             }
//             if(foundLinks){
//                 logger.info("volunteer already exists!");
//               } else {
//                 logger.info("volunteer doesn't exist!");
//               }
              
//         });
//     } catch (error) {
//         throw error;
//     }
// }

module.exports = {
    createActivity,
    updateActivity,
    getActivityById,
    getActivityList,
    deleteActivityById
};