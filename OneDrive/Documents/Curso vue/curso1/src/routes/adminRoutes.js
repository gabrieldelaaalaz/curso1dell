const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken.js');
const adminController = require('../controllers/adminController');

router.get('/users', verifyToken, adminController.users);
//router.get('/users/:id', verifyToken, adminController.user);

module.exports = router;