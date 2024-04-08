const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Initializing the router
const router = new express.Router();

// Getting the data from the database
const { users } = require('../db/database');

// Importing the middlewares
const detailsMiddleware = require('../middlewares/auth');

// For testing the routes
router.get('/users', (req, res) => {
    res.send("Hello brother");
});

// For creating the user
router.post('/users/signup', async (req, res) => {
    const user = new users(req.body);
    try {
        // Encrypting the password
        user.password = jwt.sign({
            password: user.password
        }, process.env.JWT_SECRET);

        // Generating a token
        const token = await user.generateAuthToken();
        await user.save();

        // Sending the token with the help of 'cookies'
        res.cookie("token", token, {
            path: '/',
            httpOnly: true,
            sameSite: "lax"
        });
        res.status(201).send(user);
    } catch (e) {
        res.status(500).send(e.message);
    }
});


// For logging in the user
router.post('/users/login', async (req, res) => {
    try {
        const user = await users.findOne({
            email: req.body.email
        });
        if (!user) {
            throw new Error("User does not exists!")
        }
        const decryptedPassword = jwt.verify(user.password, process.env.JWT_SECRET);
        if (decryptedPassword.password === req.body.password) {
            const token = await user.generateAuthToken();
            await user.save();

            // Sending the token with the help of 'cookies'
            res.cookie("token", token, {
                path: '/',
                httpOnly: true,
                sameSite: "lax"
            });
            res.json({
                message: "Loggen in succesfully i.e Token changed Successfully"
            });
        } else {
            throw new Error("Email or Password does not exist");
        }
    } catch (e) {
        res.status(401).json({
            message: e.message
        });
    }
});

// For logging out the user
router.post('/users/logout', (req, res) => {
    try {
        res.clearCookie('token');
        res.json({
            message: "Logged Out Successfully !"
        })
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// Getting User Details
router.get('/users/mydetails', detailsMiddleware, (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        res.status(401).send(e.message);
    }
});

router.patch('/users/update', detailsMiddleware, async (req, res) => {
    try {
        const updateUser = await users.findByIdAndUpdate(req.user.id, {
            $push: {
                medInfo: {
                    medicalHistory: req.body.medicalHistory?.map((item) => { return item }),
                    tests: req.body.tests?.map((item) => { return item }),
                    medicines: req.body.medicines?.map((item) => { return item })
                }
            }
        });
        res.send(updateUser);
    } catch (e) {
        res.status(404).send(e);
    }
})

// Sending ML model the request to give the predicted disease based on the symptoms
router.post('/users/getPred', detailsMiddleware, async (req, res) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/getPrediction', req.body);
        res.send(response.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// Create uploads directory if it does not exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const imagePath = path.join(__dirname, `./uploads/${req.file.filename}`);
    try {
        // Read the image file
        const imageBuffer = fs.readFileSync(imagePath);

        // Encode the image to base64
        const imageBase64 = imageBuffer.toString('base64');

        const flaskResponse = await axios.post('http://127.0.0.1:8000/process', {
            image: imageBase64,
        });
        return res.json({ message: flaskResponse.data.message});

    } catch (error) {
        return res.status(500).json({ message: 'Error sending image to Flask backend' });
    }
});

module.exports = router;