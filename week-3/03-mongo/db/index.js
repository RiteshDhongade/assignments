const { type } = require('express/lib/response');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:vJIJXT9puiYfYdvN@cluster0.g4mwkmd.mongodb.net/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String // Schema definition here
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    parchasedcourse: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]// Schema definition here
});

const CourseSchema = new mongoose.Schema({
    title: String,
    descpription: String,
    ImageLink: String,
    Price: Number

    // Schema definition here
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}