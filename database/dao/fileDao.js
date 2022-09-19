const { models } = require('../DBObjects');

const getFileById = async (id) => {
    try {

        const file = await models["images.files"].findById(id);
        return file;

    } catch (err) {
        throw err;
    }
}
module.exports = {
    getFileById
};
