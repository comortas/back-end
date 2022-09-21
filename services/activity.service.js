const activityDao = require('../database/dao/activityDao');
const messages = require('../util/message');

const createNewActivity = async (activityObj) => {
    try {
        var newActivity = {
            type : activityObj.type,
            name: activityObj.name,
            description: activityObj.description,
            createdBy: activityObj.createdBy,
            status: 'open',
            location: activityObj.location,
            latitude: activityObj.latitude,
            longitude: activityObj.longitude,
            poc : activityObj.poc,
            noOfVolunteers : activityObj.noOfVolunteers,
            date : activityObj.date,
            duration : activityObj.duration
        };

        var activity = await activityDao.createActivity(newActivity);
        return {
            message: messages.SuccessMessage.CreatedSuccessfully,
            activity: activity
        }
    } catch (err) {
        throw err;
    }
}

const updateActivity = async (activityId, newActivity) => {
    try {
        var updateResult = await activityDao.updateActivity(activityId, newActivity);
        if (updateResult.modifiedCount > 0) {
            return {
                message: messages.SuccessMessage.UpdatedSuccessfully
            }
        }
    } catch (error) {
        throw error;
    }
}

const getActivityById = async (id) => {
    try {
        return await activityDao.getActivityById(id);
    } catch (err) {
        throw err;
    }
}

const getActivityList = async () => {
    try {
        return await activityDao.getActivityList();
    } catch (err) {
        throw err;
    }
}

const deleteActivityById = async (id) => {
    try {
        await activityDao.deleteActivityById(id);
        return {
            message: messages.SuccessMessage.DeletedSuccessfully
        }
    } catch (err) {
        throw err;
    }
}


module.exports = {
    createNewActivity,
    updateActivity,
    getActivityList,
    getActivityById,
    deleteActivityById
}