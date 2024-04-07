const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // For parsing cookies whre we would get our token for authorization

// Joining the ENV or .env file
dotenv.config();

//Initializing the backend app
const app = express();

// In order to use cookies as an authentication token we have to use this 'corsOptions' to set credentials : true
const corsOptions = {
    origin : "http://localhost:5173", // Origin is our frontend hosted application part
    credentials : true
};

app.use(cors(corsOptions));
const PORT = process.env.PORT;

// Defining the engines to be used
app.use(express.json());

app.use(cookieParser());

// Defining the routes
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);


app.listen(PORT, () => {
    console.log("Server Listening at " + PORT);
})