const express = require('express');
const body = express.body();
const validationResult = express.validationResult();

const validateUser = [
    body('firstName')
        .trim()
        .isAlpha()
        .withMessage('First name can only contain letters!')
        .isLength({ min: 1, max: 20 })
        .withMessage('Must be between 1 and 20 characters'),
    body('lastName')
        .trim()
        .isAlpha()
        .withMessage('Last Name can only contain letters!')
        .isLength({ min: 1, max: 20 })
        .withMessage('Must be between 1 and 20 characters'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Email needs to have this stucture: john.doe@mail.com')
        .custom(),
    body('password')
        .trim()
        .isAlphanumeric()
        .isLength({ min: 8 })
        .withMessage('Password needs to be atleast 8 characters long'),
    body('passwordConfirmation')
        .trim()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('The passwords do not match'),
];
