const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

const createBooking = async (req, res) => {
  try {
    const { vehicle, startDate, endDate } = req.body;
    const existingBooking = await Booking.findOne({
      vehicle,
      status: { $ne: 'Cancelled' },
      $or: [
        { startDate: { $lt: new Date(endDate) }, endDate: { $gt: new Date(startDate) } }
      ]
    });
    if (existingBooking) {
      return res.status(400).json({ message: 'Vehicle is not available for the selected dates' });
    }
    const vehicleDetails = await Vehicle.findById(vehicle);
    if (!vehicleDetails) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = days * vehicleDetails.rentPerDay;
    const booking = new Booking({
      vehicle,
      user: req.user._id,
      startDate,
      endDate,
      totalCost: totalPrice,
      status: 'pending'
    });
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('vehicle', 'brand model image rentPerDay');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status: 'cancelled' },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
};

module.exports = { createBooking, getUserBookings, cancelBooking };