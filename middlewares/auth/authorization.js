const _ = require('lodash');
const cache = require('../cache');
const constants = require('../../util/constants');
const MDSessionHandler = require('../../helpers/MDSessionHandler');

module.exports = (name) => {
    return async (req, res, next) => {

        let organizationAccess;
        let locationAccess;
        let organizationRoleAccess;
        let locationRoleAccess;
        let appointment

        if (_.isEqual(constants.Role.Patient,req.role)) {
            if(req.appointmentId){
                // appointment = await appointmentService.getAppointmentById(req.appointmentId);
                appointment = await MDSessionHandler.makeAPICall('GET', `${process.env.APPLICATION_URL}/api/telehealth/appointment/getAppointmentById/${req.appointmentId}`, null);
                req.organization = appointment.metaData.organization;
                req.clinicLocation = appointment.metaData.clinicLocation
            }
        }

        organizationAccess = await cache.getValue(`organizationAccess:${req.organization}-${name}`);
        locationAccess = await cache.getValue(`locationAccess:${req.organization}-${req.clinicLocation}-${name}`);

        if (_.isEmpty(organizationAccess) && !_.isEqual(constants.Role.SuperAdmin, req.role) && !_.isEqual(constants.Role.System, req.role)) {
            organizationAccess = await MDSessionHandler.makeAPICall('POST', `${process.env.APPLICATION_URL}/api/telehealth/user-management/accessControl/getOrganizationAccessByName`, {"organization" : req.organization, "referenceName":name});
            cache.setValue(`organizationAccess:${organizationAccess.organization}-${organizationAccess.referenceName}`, organizationAccess, 360);
        }
        if (_.isEmpty(locationAccess) && !_.isEqual(constants.Role.SuperAdmin, req.role) && !_.isEqual(constants.Role.Executive, req.role) && !_.isEqual(constants.Role.Director, req.role) && !_.isEqual(constants.Role.Admin, req.role) && !_.isEqual(constants.Role.System, req.role)) {
            locationAccess = await MDSessionHandler.makeAPICall('POST', `${process.env.APPLICATION_URL}/api/telehealth/user-management/accessControl/getLocationAccessByName`, {"organization" : req.organization, "clinicLocation" : req.clinicLocation, "referenceName":name});
            cache.setValue(`locationAccess:${locationAccess.organization}-${locationAccess.clinicLocation}-${locationAccess.referenceName}`, locationAccess, 360);
        }

        if (!_.isEqual(constants.Role.SuperAdmin, req.role) && !_.isEqual(constants.Role.System, req.role)) {
            organizationRoleAccess = _.find(organizationAccess.role, function (role) {
                return role.name == req.role;
            });
        }

        if (!_.isEqual(constants.Role.SuperAdmin, req.role) && !_.isEqual(constants.Role.Executive, req.role) && !_.isEqual(constants.Role.Director, req.role) && !_.isEqual(constants.Role.Admin, req.role) && !_.isEqual(constants.Role.System, req.role)) {
            locationRoleAccess = _.find(locationAccess.role, function (role) {
                return role.name == req.role;
            });
        }

        if (_.isEqual(constants.Role.System, req.role) || (_.isEqual(constants.Role.SuperAdmin, req.role) || !_.isEmpty(organizationRoleAccess)) && (_.isEmpty(req.organization) || _.isEqual(req.organization.toString(), organizationAccess.organization.toString())) && (_.isEmpty(req.clinicLocation) || (_.isEqual(req.clinicLocation.toString(), locationAccess.clinicLocation.toString()) && _.isEqual(req.organization.toString(), locationAccess.organization.toString()) && !_.isEmpty(locationRoleAccess)))) {
            next();
        } else {
            res.status(403).json({ error: `Access Denied: You do not have correct privilege to perform this operation` }); // user is forbidden
        }

    }
}