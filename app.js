const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const MONGOdbURI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

const adminAuthRouter = require('./routers/adminRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use('/admin', adminAuthRouter);

try{
    mongoose.connect(MONGOdbURI).then(() => {
        console.log(`Database Connected.`);
        app.listen(PORT, () => {
            console.log(`Server Running on PORT: ${PORT}.`);
        })
    }).catch(err => {
        console.log(`Error Connecting to the database ${err}`);
    })
}catch(err){
    console.log(`Error Running Application ${err}`);
}  