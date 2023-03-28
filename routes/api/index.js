// importing router and routes
const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
// mounting our routes
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;
