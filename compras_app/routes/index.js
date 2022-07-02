const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    if (req.isAuthenticated()) {
        // res.render('index');
        res.redirect('/listas');
    } else {
        res.redirect('/login');
    }    
});

module.exports = router;