const User = require('../../models/userModel');
const jsonDb = require('../../utils/jsonDb');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const mongoose = require('mongoose');

const registerUser = async (userData) => {
    const { name, email, password } = userData;
    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
        let user = await User.findOne({ email });
        if (user) throw new Error('Identity already registry');

        user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '7d' });
        return { token, user: { id: user._id, name: user.name, email: user.email } };
    } else {
        const existingUser = jsonDb.findUserByEmail(email);
        if (existingUser) throw new Error('Identity already registry');

        const newUser = await jsonDb.saveUser({ name, email, password });
        const token = jwt.sign({ id: newUser._id }, config.JWT_SECRET, { expiresIn: '7d' });
        return { token, user: { id: newUser._id, name: newUser.name, email: newUser.email } };
    }
};

const loginUser = async (credentials) => {
    const { email, password } = credentials;
    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Invalid Credentials');

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error('Invalid Credentials');

        const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '7d' });
        return { token, user: { id: user._id, name: user.name, email: user.email } };
    } else {
        const user = jsonDb.findUserByEmail(email);
        if (!user) throw new Error('Invalid Credentials');

        const isMatch = await jsonDb.comparePassword(password, user.password);
        if (!isMatch) throw new Error('Invalid Credentials');

        const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '7d' });
        return { token, user: { id: user._id, name: user.name, email: user.email } };
    }
};

module.exports = {
    registerUser,
    loginUser
};
