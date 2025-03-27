const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  type: { type: String, enum: ['Car', 'Bike'], required: true },
  pricePerDay: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  seats: { type: Number, required: true },
  transmission: { type: String, enum: ['Automatic', 'Manual'], required: true },
  fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], required: true },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);
