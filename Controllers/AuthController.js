const { response } = require('express')
const UserModel = require('../Models/User');
const { use } = require('../Routes/AuthRouter');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { boolean } = require('joi');

const signup = async (request, response) => {
    try {
        const {name, email, password} = request.body;
        const user = await UserModel.findOne({email : email})

        if(user) {
            return response.status(409).json({
                message : 'User Already Exists, you can login',
                success : false
            })
        }

        const newUser = new UserModel({name, email, password})
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        response.status(201)
        .json({
            message : "Signup Successfull",
            success : true
        })

    } catch (err) {
        response.status(500)
        .json({
            message: "Internal server errror",
            success: false
        })
    }
}

const login = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await UserModel.findOne({ email });

        if (user === null) {
            return response.status(403)
                .json({ message: 'Incorrect Email!', success: false });
        }


        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual) {
            return response.status(403)
                .json({ message: 'Incorrect Password!', success: false });
        }
        

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        response.status(200)
        .json({
            message : 'Login Success',
            success : true,
            jwtToken, 
            email : email,
            name : user.name
        })
    } catch (err) {
        response.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }

}

module.exports = {
    signup,
    login
}