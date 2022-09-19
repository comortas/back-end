const { models } = require('../DBObjects');

const getAppSettingById = async (appSettingId) => {
    try {
        return await models.ApplicationSetting.findById(appSettingId);
    } catch (error) {
        throw error;
    }
}

const getAppSettingByName = async (appSettingName) => {
    try {
        return await models.ApplicationSetting.findOne({ 'name' : appSettingName });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAppSettingById,
    getAppSettingByName
};