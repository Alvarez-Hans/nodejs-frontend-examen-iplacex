const express = require('express');
const router = express.Router();
// const { isLoggedIn } = require('../lib/auth');

router.get('/', async (req, res) => {
    if (req.isAuthenticated()) {
        // res.render('index');
        res.redirect('/listas');
    } else {
        res.redirect('/login');
    }    
});

module.exports = router;