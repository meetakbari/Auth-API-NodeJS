const router = require('express').Router();
const User = require('../models/Users');
const { DataValidation } = require('../dataValidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// app.use('/api/user/') Register
router.post('/register', async (req, res) => {
    // validate that the body content matches our requirements
    const {error} = DataValidation.registerValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    // check whether user already exists or not
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email is already registered!');

    // encrypt the password
    const encryptedPassoword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassoword
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err) {
        res.status(400).send(err);
    }
})

// app.use('/api/user/') Login
router.post('/login', async (req, res) => {
    // validate that the body content matches our requirements
    const {error} = DataValidation.loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if the email exists
    const userInDbExists = await User.findOne({email: req.body.email});
    if (!userInDbExists) return res.status(400).send('Email not registered!');

    // validate the password
    const validPassoword = await bcrypt.compare(req.body.password, userInDbExists.password);
    if (!validPassoword) return res.status(401).send('Invalid Password');
    
    const token = jwt.sign({id: userInDbExists._id}, process.env.TOKEN_SECRET);

    res.header('auth-token', token).status(200).send(token);
})

module.exports = router;