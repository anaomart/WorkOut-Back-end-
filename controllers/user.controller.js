const userModel = require('../models/user.model');
const { catchAsyncError } = require('../utils/catchAsyncError');
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '1d' })
}

//login user



module.exports.loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        let user = await userModel.login(email, password)
        let token = createToken(user._id)
        res.status(200).json({ email, token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


module.exports.SignupUser = (async(req, res) => {
    let { email, password } = req.body;
    try {
        let user = await userModel.signup(email, password)
        let token = createToken(user._id)
        res.status(200).json({ email, token })

    } catch (error) {
        res.status(400).json({ error: error.message })


    }
})