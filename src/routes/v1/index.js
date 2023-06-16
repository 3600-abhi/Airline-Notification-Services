const express = require("express");
const emailRoutes = require('./email-routes');

const router = express.Router();

router.use('/tickets', emailRoutes);

module.exports = router;
