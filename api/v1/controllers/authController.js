const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    /**
     * User signup
     */
    async signup(req, res) {
        try {
            // Create a new user with the provided request body
            const user = new User(req.body);
            // Save the user to the database
            await user.save();
            // Generate a JWT token for the user
            const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
            // Add the token to the user's tokens array
            user.tokens = user.tokens.concat({ token });
            // Save the updated user
            await user.save();
            // Respond with the user and token
            res.status(201).send({ user, token });
        } catch (error) {
            // Handle signup errors
            res.status(400).send(error);
        }
    },

    /**
     * User login
     */
    async login(req, res) {
        try {
            // Find the user by email
            const user = await User.findOne({ email: req.body.email });
            // If the user is not found, return a 404 response
            if (!user) {
                return res.status(404).send('Unable to login');
            }

            // Compare the provided password with the user's hashed password
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            // If the passwords don't match, return a 404 response
            if (!isMatch) {
                return res.status(404).send('Unable to login');
            }

            // Generate a JWT token for the user
            const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
            // Add the token to the user's tokens array
            user.tokens = user.tokens.concat({ token });
            // Save the updated user
            await user.save();

            // Respond with the user and token
            res.send({ user, token });
        } catch (error) {
            // Handle login errors
            res.status(500).send();
        }
    }
};

module.exports = authController;
