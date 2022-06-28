const { Schema, model } = require('mongoose');

const targetMuscle = new Schema({
    name : {
        type : String,
        unique : true,
        required : true
    }
});

module.exports = model('targetMuscles', targetMuscle);