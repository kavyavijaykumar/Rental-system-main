const Vehicle = require('../models/Vehicle');

const getVehicles = async (req, res) => {
  try {
    const { type, minPrice, maxPrice, isAvailable } = req.query;
    let query = {};
    if (type) query.type = type;
    if (minPrice) query.pricePerDay = { $gte: Number(minPrice) };
    if (maxPrice) query.pricePerDay = { ...(query.pricePerDay || {}), $lte: Number(maxPrice) };
    if (isAvailable !== undefined) {
      query.isAvailable = isAvailable === 'true';
    }
    const vehicles = await Vehicle.find(query);
    console.log("✅ Vehicles fetched successfully"); // Debugging log
    res.json(vehicles);
  } catch (error) {
    console.error("❌ Error fetching vehicles:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    const savedVehicle = await vehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    res.status(400).json({ message: 'Error creating vehicle', error: error.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ message: 'Error updating vehicle', error: error.message });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle };
