const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db");
const { default: mongoose} = require("mongoose");


// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username,
        password
    })
    res.json({
        Message: "User created successfully"
    })
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});

    res.json({
        course: response
    })




});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username: username
        
    },{
        "$push":{
            purchasedCourse: courseId
        }
    }
)
res.json({
    message: "Purchase Complete!"
})
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.parchasedcourse);
    const course = await Course.find({
        _id: {
            "$in": user.purchasedCourse
        }
    });
    res.json({
    courses: course
    })
});

module.exports = router