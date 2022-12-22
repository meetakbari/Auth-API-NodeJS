const router = require('express').Router();
const User = require('../models/Users');
const Joi = require('@hapi/joi');

const validationSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(7).required().email(),
    password: Joi.string().min(6).required()
})

// app.use('/api/user/')
router.post('/register', async (req, res) => {
    // validate that the body content matches our requirements
    const {error} = validationSchema.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

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