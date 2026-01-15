const express = require('express');
const router = express.Router();

const { protect, isAdmin, isClient} = require('../middlewares/authMiddleware');
const{ bookAppointment, getAllAppointments, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');

router.post('/book', protect, isClient, bookAppointment);

router.get('/all', protect, isAdmin, getAllAppointments);
router.put('/:id', protect, isAdmin, updateAppointment);
router.delete('/:id', protect, isAdmin, deleteAppointment);

module.exports = router;