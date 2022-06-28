const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    token : {

    },
    createdAt : {
        type : Date,
        required : true,
        default : new Date(),
        immutable : true
    },
    updatedAt : {
        type : Date,
        required : true,
        default : new Date()
    }
});

module.exports = model('adminUser', adminSchema);