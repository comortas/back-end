const activityDao = require('../database/dao/activityDao');
const messages = require('../util/message');
const logger = require('../util/logger');
const constant = require('../util/constants');


const createNewActivity = async (activityObj) => {
    try {
        var newActivity = {
            type: activityObj.type,
            name: activityObj.name,
            description: activityObj.description,
            createdBy: activityObj.createdBy,
            status: 'open',
            location: activityObj.location,
            latitude: activityObj.latitude,
            longitude: activityObj.longitude,
            poc: activityObj.poc,
            noOfVolunteers: activityObj.noOfVolunteers,
            date: activityObj.date,
            duration: activityObj.duration
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

const applyRequest = async (applyObj) => {
    try {
        var activity = await getActivityById(applyObj.activityId);
        //volunteer already exist
        if (activity && activity.volunteers.length > 0
            && activity.volunteers.find(element => {
                if (element.volunteerId = applyObj.volunteerId) {
                    return true
                }
                else { return false }
            })) {
            //logger.info("volunteer already exist");
            return {
                message: messages.ErrorMessage.AlreadyApplied
            }
        }
        //New request to join the activity
        else {
            var volunteer = {
                volunteerId: applyObj.volunteerId,
                requestStatus: constant.ACTIVITY_REQUEST_STATUS.PENDING
            }
            activity.volunteers.push(volunteer);
            return await updateActivity(applyObj.activityId, activity);
        }
    } catch (err) {
        throw err;
    }
}

const approveOrDenyRequest = async (obj) => {
    try {
        var activity = await getActivityById(obj.activityId);

        if (activity && activity.volunteers.length > 0) {

            activity.volunteers.find(element => {
                if (element.volunteerId = obj.volunteerId) {
                    element.requestStatus = obj.reqStatus;
                    return true;
                }
                else { return false }
            });          

            //activity.volunteers.push(volunteer);
            //logger.info(activity);
            return await updateActivity(obj.activityId, activity);
        }
        //New request to join the activity
        else {
            return {
                message: messages.ErrorMessage.DataNotFound
            }
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
    deleteActivityById,
    applyRequest,
    approveOrDenyRequest
}