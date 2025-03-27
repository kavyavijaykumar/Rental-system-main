const express = require('express');
const router = express.Router();
const { 
  createBooking, 
  getUserBookings, 
  cancelBooking 
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createBooking)
  .get(protect, getUserBookings);

router.route('/:id/cancel')
  .put(protect, cancelBooking);

module.exports = router;