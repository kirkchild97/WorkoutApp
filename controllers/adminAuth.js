const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Admin = require('../models/admin');

exports.registerAdmin = async (req, res) => {
    console.log('Hitting Register Admin.');
    const {
        firstName,
        lastName,
        email,
        password,
        confirm
    } = req.body;
    console.log(req.body);
    const validateAdmin = await validateRegistration({ firstName, lastName, email, password, confirm });
    if(!validateAdmin.isValid){
        return res.send(JSON.stringify({
            success : false,
            messages : {...validateAdmin.messages}
        }));
    }
    const hashedPw = await bcrypt.hash(password, 15);
    const admin = new Admin({ firstName, lastName, email, password : hashedPw });
    await admin.save();
    // Send JSON Token if automatically logging in
    return res.send(JSON.stringify({
        success : true
    }));
}

exports.loginAdmin = async (req, res) => {
    console.log('Hitting Login Admin');
    const {
        email,
        password
    } = req.body;
    const checkEmail = await Admin.findOne({ email });
    if(!checkEmail){
        return res.send(JSON.stringify({
            success : false,
            message : "Invalid Credentials"
        }));
    }
    const checkPW = await bcrypt.compare(password, checkEmail.password);
    if(!checkPW){
        return res.send(JSON.stringify({
            success : false,
            message : "Invalid Credentials"
        }));
    }
    const token = jwt.sign({ _id : checkEmail._id }, process.env.JWT_SECRET);
    return res.send(JSON.stringify({
        success : true,
        token
    }));
}

const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const validateRegistration = async ({ firstName, lastName, email, password, confirm}) => {
    let isValid = true;
    const validations = {};
    const messages = {};
    if(firstName === ''){
        isValid = false;
        messages.firstName = 'First name is invalid.';
    }
    if(lastName === ''){
        isValid = false;
        messages.lastName = 'Last name is invalid.';
    }
    const reEmail = emailRegex.test(email);
    if(!reEmail){
        isValid = false;
        messages.email = 'Email is invalid';
    }
    else {
        checkEmail = await Admin.findOne({ email });
        if(checkEmail){
            isValid = false;
            messages.email = 'Email is already in use.';
        }
    }
    if(password === '' || password !== confirm){
        isValid = false;
        messages.password = 'Invalid Password';
    }
    validations.isValid = isValid;
    validations.messages = messages;
    return validations;
}