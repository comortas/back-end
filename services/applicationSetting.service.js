const applicationSettingsDao = require('../database/dao/applicationSettingsDao');

const getApplicationSettingByName = async (name) => {
    try {
        return await applicationSettingsDao.getAppSettingByName(name);
    }
    catch (error) {
        throw error;
    }
}
module.exports = {
    getApplicationSettingByName
};