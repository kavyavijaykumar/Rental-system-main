const express = require('express');
const router = express.Router();
const { 
  getVehicles, 
  getVehicleById, 
  createVehicle, 
  updateVehicle, 
  deleteVehicle 
} = require('../controllers/vehicleController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/all', getVehicles); // ✅ This correctly handles "/api/vehicles/all"
router.route('/')
  .post(protect, admin, createVehicle);

router.route('/:id')
  .get(getVehicleById)  // 🚨 Issue: This was catching "/all" before
  .put(protect, admin, updateVehicle)
  .delete(protect, admin, deleteVehicle);

module.exports = router;
