const mongoose = require('mongoose');

// const mongoURL = 'mongodb://localhost:27017/StudentDB';

mongoose.connect('mongodb://127.0.0.1/StudentDB')
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((err) => {
        console.error("Received an Error: " + err);
    });

// Ensure the student.model file is present and correctly set up
require('./student.model');