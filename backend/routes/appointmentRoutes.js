const express = require('express');
const router = express.Router();

const { protect, isAdmin, isClient} = require('../middlewares/authMiddleware');
const{ bookAppointment, getAllAppointments, updateAppointment, confirmPayment, joinMeeting, deleteAppointment } = require('../controllers/appointmentController');

router.post('/book', protect, isClient, bookAppointment);

router.get('/all', protect, isAdmin, getAllAppointments);
router.patch('/status/:id', protect, isAdmin, updateAppointment);
router.patch('/confirm-payment/:id', protect, isAdmin, confirmPayment);
router.delete('/:id', protect, isAdmin, deleteAppointment);
router.get('/meet/:token', protect, joinMeeting);
module.exports = router;