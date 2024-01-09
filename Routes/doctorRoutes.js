const express = require('express');
const authMiddleware = require('../Middlewares/authMiddleware');
const { getDoctorInfoController, updateProfileController,getDoctorByIdController
    ,doctorAppointmentsController,updateStatusController } = require('../Controllers/doctorController');

const router = express.Router();

router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController);
router.post('/updateProfile',authMiddleware,updateProfileController);
router.post('/getDoctorById',authMiddleware,getDoctorByIdController);
router.post('/doctor-appointments',authMiddleware,doctorAppointmentsController);
router.post('/update-status',authMiddleware,updateStatusController);

module.exports = router;