const { Op } = require('sequelize');

const User = require('../models/User'); // Import User model
const bcrypt = require('bcrypt');  // For hashing passwords
const sequelize = require('../config/db');

const defaultAdmin = {
    username: 'admin',
    password: 'admin123',  // You might want to hash this password
};

const cantonController = {
    login: (req, res) => {
        res.render('login');
    },
    register: (req, res) => {
        res.render('register');
    },
    dashboard: (req, res) => {
        res.render('dashboard');
    },
    useradmin: (req, res) => {
        res.render('useradmin');
    },

    // Handle login logic
    handleLogin: async (req, res) => {
        const { name, password } = req.body;

        // Check if admin login
        if (name === defaultAdmin.username && password === defaultAdmin.password) {
            return res.redirect('/dashboard'); // Redirect to admin dashboard
        }

        try {
            // Check if user exists in the database
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { name: name },
                        { email: name }
                    ]
                }
            });

            if (user) {
                // Compare provided password with stored hashed password
                if (bcrypt.compareSync(password, user.password)) {
                    // Passwords match, redirect to user dashboard
                    res.redirect('/useradmin');
                } else {
                    // Invalid password
                    res.send('Invalid name or password.');
                }
            } else {
                // No user found
                res.send('Invalid name or password.');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    // Handle registration logic
    handleRegister: async (req, res) => {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.send('Passwords do not match.');
        }

        try {
            // Hash the password
            const hashedPassword = bcrypt.hashSync(password, 10);

            // Insert into users table
            const user = await User.create({
                name,
                email,
                password: hashedPassword
            });

            res.redirect('/'); // Redirect after successful registration
        } catch (err) {
            console.error(err);
            res.status(500).send('Error registering user. Please try again.');
        }
    },
};

module.exports = cantonController;
