const express = require('express');
const authMiddleware = require('../Middlewares/authMiddleware');
const { loginController, registerController,authController,applyDoctorController,getAllNotificationsController,deleteAllNotificationsController,getAllDoctorsControllers, bookAppointmentController,bookingAvailabilityController,userAppointmentController } = require('../Controllers/userControllers');

const router = express.Router();

router.post('/login',loginController);

router.post('/register',registerController);

router.post('/getUserData',authMiddleware,authController);

router.post('/apply-doctor',authMiddleware,applyDoctorController);

router.post('/get-all-notifications',authMiddleware,getAllNotificationsController);

router.post('/delete-all-notifications',authMiddleware,deleteAllNotificationsController);

router.get('/getAllDoctors',authMiddleware,getAllDoctorsControllers);

router.post('/book-appointment',authMiddleware,bookAppointmentController);

router.post('/booking-availability',authMiddleware,bookingAvailabilityController);

router.post('/user-appointments',authMiddleware,userAppointmentController);

module.exports = router;