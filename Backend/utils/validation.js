const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation regex (at least 8 characters, one uppercase, one lowercase, one number, one special char)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Phone number validation regex (supports international formats)
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {object} Validation result
 */
const validateEmail = (email) => {
    if (!email) return { isValid: false, error: 'Email is required' };
    if (!EMAIL_REGEX.test(email)) return { isValid: false, error: 'Invalid email format' };
    return { isValid: true };
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @returns {object} Validation result
 */
const validatePassword = (password) => {
    if (!password) return { isValid: false, error: 'Password is required' };
    if (password.length < 8) return { isValid: false, error: 'Password must be at least 8 characters long' };
    if (!PASSWORD_REGEX.test(password)) return { 
        isValid: false, 
        error: 'Password must include uppercase, lowercase, number, and special character' 
    };
    return { isValid: true };
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {object} Validation result
 */
const validatePhone = (phone) => {
    if (!phone) return { isValid: false, error: 'Phone number is required' };
    if (!PHONE_REGEX.test(phone)) return { isValid: false, error: 'Invalid phone number format' };
    return { isValid: true };
};

/**
 * Validate vehicle input
 * @param {object} vehicle - Vehicle data to validate
 * @returns {object} Validation result
 */
const validateVehicle = (vehicle) => {
    const errors = {};

    // Validate make
    if (!vehicle.make || vehicle.make.trim() === '') {
        errors.make = 'Vehicle make is required';
    }

    // Validate model
    if (!vehicle.model || vehicle.model.trim() === '') {
        errors.model = 'Vehicle model is required';
    }

    // Validate year
    const currentYear = new Date().getFullYear();
    if (!vehicle.year) {
        errors.year = 'Vehicle year is required';
    } else if (vehicle.year < 1900 || vehicle.year > currentYear + 1) {
        errors.year = `Vehicle year must be between 1900 and ${currentYear + 1}`;
    }

    // Validate daily rate
    if (!vehicle.dailyRate) {
        errors.dailyRate = 'Daily rate is required';
    } else if (vehicle.dailyRate <= 0) {
        errors.dailyRate = 'Daily rate must be a positive number';
    }

    // Validate vehicle type
    const validVehicleTypes = ['sedan', 'suv', 'truck', 'van', 'motorcycle'];
    if (!vehicle.type || !validVehicleTypes.includes(vehicle.type.toLowerCase())) {
        errors.type = 'Invalid vehicle type';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * Validate booking input
 * @param {object} booking - Booking data to validate
 * @returns {object} Validation result
 */
const validateBooking = (booking) => {
    const errors = {};

    // Validate user ID
    if (!booking.userId) {
        errors.userId = 'User ID is required';
    }

    // Validate vehicle ID
    if (!booking.vehicleId) {
        errors.vehicleId = 'Vehicle ID is required';
    }

    // Validate start date
    if (!booking.startDate) {
        errors.startDate = 'Start date is required';
    } else {
        const startDate = new Date(booking.startDate);
        if (isNaN(startDate.getTime())) {
            errors.startDate = 'Invalid start date format';
        } else if (startDate < new Date()) {
            errors.startDate = 'Start date cannot be in the past';
        }
    }

    // Validate end date
    if (!booking.endDate) {
        errors.endDate = 'End date is required';
    } else {
        const endDate = new Date(booking.endDate);
        const startDate = new Date(booking.startDate);
        
        if (isNaN(endDate.getTime())) {
            errors.endDate = 'Invalid end date format';
        } else if (endDate <= startDate) {
            errors.endDate = 'End date must be after start date';
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * Validate user registration input
 * @param {object} user - User registration data to validate
 * @returns {object} Validation result
 */
const validateUserRegistration = (user) => {
    const errors = {};

    // Validate first name
    if (!user.firstName || user.firstName.trim() === '') {
        errors.firstName = 'First name is required';
    }

    // Validate last name
    if (!user.lastName || user.lastName.trim() === '') {
        errors.lastName = 'Last name is required';
    }

    // Validate email
    const emailValidation = validateEmail(user.email);
    if (!emailValidation.isValid) {
        errors.email = emailValidation.error;
    }

    // Validate password
    const passwordValidation = validatePassword(user.password);
    if (!passwordValidation.isValid) {
        errors.password = passwordValidation.error;
    }

    // Validate phone
    const phoneValidation = validatePhone(user.phone);
    if (!phoneValidation.isValid) {
        errors.phone = phoneValidation.error;
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

module.exports = {
    validateEmail,
    validatePassword,
    validatePhone,
    validateVehicle,
    validateBooking,
    validateUserRegistration
};