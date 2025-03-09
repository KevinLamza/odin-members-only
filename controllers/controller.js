const express = require('express');
const { body, validationResult } = require('express-validator');
const { insertUser } = require('../database/queries.js');
const bcrypt = require('bcryptjs');

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
        .withMessage('Email needs to have this stucture: john.doe@mail.com'),
    // .custom(),
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

const getIndexPage = (req, res) => {
    res.render('index');
};

const getCreateUser = (req, res) => {
    res.render('sign-up');
};

const postCreateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('sign-up', {
            title: 'sign-up',
            errors: errors.array(),
        });
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await insertUser(
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            hashedPassword,
            false, //isMember
            false, //isAdmin
        );
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    validateUser,
    getIndexPage,
    getCreateUser,
    postCreateUser,
};
