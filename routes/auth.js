const router = require('express').Router();
const User = require('../models/Users');
const { DataValidation } = require('../dataValidation');

// app.use('/api/user/')
router.post('/register', async (req, res) => {
    // validate that the body content matches our requirements
    const {error} = DataValidation.registerValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    // check whether user already exists or not
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email is already registered!');

    // encrypt the password
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await user.save()
            .then(()=>{console.log('User saved!')})
            .then(res.send(user));
    } catch(err) {
        res.status(400).send(err);
    }
})

module.exports = router;