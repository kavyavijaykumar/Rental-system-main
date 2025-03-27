const Vehicle = require('../models/Vehicle');

// Sample vehicle data for seeding
const vehicleData = [
    {
        make: 'Toyota',
        model: 'Camry',
        year: 2022,
        type: 'sedan',
        dailyRate: 50,
        availability: true,
        fuelType: 'gasoline',
        transmission: 'automatic',
        seatingCapacity: 5
    },
    {
        make: 'Honda',
        model: 'CR-V',
        year: 2021,
        type: 'suv',
        dailyRate: 65,
        availability: true,
        fuelType: 'gasoline',
        transmission: 'automatic',
        seatingCapacity: 5
    },
    {
        make: 'Ford',
        model: 'F-150',
        year: 2022,
        type: 'truck',
        dailyRate: 80,
        availability: true,
        fuelType: 'gasoline',
        transmission: 'automatic',
        seatingCapacity: 3
    }
];

/**
 * Seed vehicles into the database
 * @returns {Promise<void>}
 */
async function seedVehicles() {
    try {
        // Check if vehicles already exist
        const existingVehicles = await Vehicle.countDocuments();
        
        if (existingVehicles === 0) {
            // Insert seed vehicles
            await Vehicle.insertMany(vehicleData);
            console.log('Vehicle database seeded successfully');
        } else {
            console.log('Vehicle database already populated');
        }
    } catch (error) {
        console.error('Error seeding vehicle database:', error);
        throw error;
    }
}

module.exports = seedVehicles;