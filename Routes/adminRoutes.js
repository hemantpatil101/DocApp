const express = require('express');
const authMiddleware = require('../Middlewares/authMiddleware');
const { getAllUsersController, getAllDoctorsController,changeAccountStatusController } = require('../Controllers/adminControllers');

const router = express.Router();

router.get('/getAllUsers',authMiddleware,getAllUsersController);

router.get('/getAllDoctors',authMiddleware,getAllDoctorsController);

router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController)

module.exports = router;