const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const auth = async(req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization Token Required' })
    }

    const token = authorization.split(' ')[1];
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decode)
        req.user = await userModel.findOne({ _id: decode._id }).select('_id')
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is Not Authorized' })
    }

}
module.exports = auth;