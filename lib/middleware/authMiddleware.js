const jwt = require('jsonwebtoken');
const User = require('./../../api/v1/models/user');

const auth = async (req, res, next) => {
    try {
        // Get the JWT token from the request header
        const token = req.header('Authorization').replace('Bearer ', '');
        // Verify the token using the JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user by their decoded ID and populate the 'notes' virtual field
        const user = await User.findById(decoded._id).populate('notes');

        if (!user) {
            throw new Error();
        }

        // Attach the token and user to the request object for further use
        req.token = token;
        req.user = user; 
        next();
    } catch (error) {
        // Handle authentication errors
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;
