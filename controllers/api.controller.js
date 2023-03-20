const express = require('express');

module.exports = (
    phoneService,
) => {
    const router = express.Router();
    //defining controllers
    const phoneController = require('./phoneController')(
        phoneService
    );
    //defining routers
    router.use('/phones', phoneController);
    return router;
}