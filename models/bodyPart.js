const { Schema, model } = require('mongoose');

const bodyPartSchema = new Schema({
    name : {
        type : String,
        unique : true,
        required : true
    }
});

module.exports = model('bodyParts', bodyPartSchema);