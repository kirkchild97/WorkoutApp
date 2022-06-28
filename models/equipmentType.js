const { Schema, model } = require('mongoose');

const equipmentTypeSchema = new Schema({
    name : {
        type : String,
        unique : true,
        required : true
    }
});

module.exports = model('equipmentTypes', equipmentTypeSchema);