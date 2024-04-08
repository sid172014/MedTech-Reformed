const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.connect(process.env.MONGO_DB_URL);

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password :{
      type : String,
      required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : Number,
        required : true,
        unique : true
    },
    medInfo: [
        {
            medicalHistory: {
                type: [String],
                default: []
            },
            tests: {
                type: [String],
                default: []
            },
            medicines: {
                type: [String],
                default: []
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    presmeds : {
        type : [String],
        default : []
    },
    token : {
        type : String,
        required : true
    }
});


// Not using the ES6 function because we need to access 'this' inside our 'getAuthToken(...)' function
userSchema.methods.generateAuthToken = async function(){
    const user = this;  
    // Creating a token
    user.token = jwt.sign({
        _id : user._id.toString(),
    },process.env.JWT_SECRET);

    return user.token;
};

const users = mongoose.model('users',userSchema);

module.exports = {users};