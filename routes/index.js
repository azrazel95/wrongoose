// importing our router and apiroutes
const router = require('express').Router();
const apiRoutes = require('./api');
// mounting our api route
router.use('/api', apiRoutes);
// wildcard
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
