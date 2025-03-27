import React, { useState, useEffect } from "react";
import "./App.css";

function RentalApp() {
  // State management
  const [activeTab, setActiveTab] = useState("cars");
  const [vehicles, setVehicles] = useState({ cars: [], bikes: [] });
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    startDate: "",
    endDate: "",
    name: "",
    email: "",
    phone: "",
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [authError, setAuthError] = useState("");

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  // Fetch vehicles from API
  useEffect(() => {
    const sampleVehicles = {
      cars: [
        {
          id: 1,
          name: "Tesla Model 3",
          type: "car",
          price: 120,
          image: "https://th.bing.com/th/id/OIP.hOcdmmv1KirFVAJVcJsWCAHaE8?rs=1&pid=ImgDetMain",
          rating: 4.8,
          available: true,
        },
        {
          id: 2,
          name: "Toyota Camry",
          type: "car",
          price: 80,
          image: "https://autoimage.capitalone.com/cms/Auto/assets/images/3184-hero-2025-toyota-camry-review.jpg",
          rating: 4.5,
          available: true,
        },
        {
          id: 3,
          name: "Honda Civic",
          type: "car",
          price: 70,
          image: "https://images.carexpert.com.au/resize/3000/-/app/uploads/2022/11/Honda-Civic-e_HEV-HERO-3x2-1.jpg",
          rating: 4.3,
          available: true,
        },
        {
          id: 4,
          name: "Ford Mustang",
          type: "car",
          price: 150,
          image: "https://www.carscoops.com/wp-content/uploads/2019/04/7b78edbb-ford-mustang-new-york-auto-show-.jpg",
          rating: 4.9,
          available: false,
        },
        {
          id: 5,
          name: "BMW 3 Series",
          type: "car",
          price: 110,
          image: "https://paultan.org/image/2022/05/2022-BMW-3-Series-Sedan-facelift-G20-LCI-debut-14.jpg",
          rating: 4.6,
          available: true,
        },
      ],
      bikes: [
        {
          id: 101,
          name: "Kawasaki Ninja",
          type: "bike",
          price: 75,
          image: "https://th.bing.com/th/id/OIP.8cChHVX4m1EWrd4bd0tmDAHaGv?w=211&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          rating: 4.7,
          available: true,
        },
        {
          id: 102,
          name: "Harley Davidson",
          type: "bike",
          price: 95,
          image: "https://images.carandbike.com/cms/Harley_Davidson_X440_m2_b7e0cf6483.jpg",
          rating: 4.9,
          available: true,
        },
        {
          id: 103,
          name: "Yamaha MT-07",
          type: "bike",
          price: 65,
          image: "https://www.cycleworld.com/resizer/UQtRAOjDmuB93-p08hLtXxutVDM=/cloudfront-us-east-1.images.arcpublishing.com/octane/LDURIQIGQRCG7GSDBBI2F5HL6Y.jpg",
          rating: 4.4,
          available: false,
        },
        {
          id: 104,
          name: "Honda CBR",
          type: "bike",
          price: 60,
          image: "https://th.bing.com/th/id/OIP.44QLxpMS5Nk_wzIOOqv8SwHaE8?w=259&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          rating: 4.3,
          available: true,
        },
        {
          id: 105,
          name: "Ducati Monster",
          type: "bike",
          price: 90,
          image: "https://th.bing.com/th/id/OIP._XkhL1ZCdoAoZAkG0eiMHwHaE8?w=267&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          rating: 4.8,
          available: true,
        },
      ],
    };

    // Simulate loading
    setTimeout(() => {
      setVehicles(sampleVehicles);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Check for saved login token
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        setIsLoggedIn(true);

        // Pre-fill booking form with user details
        setBookingDetails((prevState) => ({
          ...prevState,
          name: user.name,
          email: user.email,
          phone: user.phone || "",
        }));

        // Fetch user bookings
        fetchUserBookings(user.id);
      } catch (e) {
        console.error("Error parsing user data:", e);
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
      }
    }
  }, []);

  // Fetch user bookings
  const fetchUserBookings = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/bookings/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Filter vehicles based on search term
  const filteredVehicles =
    vehicles[activeTab]?.filter((vehicle) =>
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Add vehicle to cart
  const addToCart = (vehicle) => {
    if (!isLoggedIn) {
      setAuthError("Please login to book a vehicle");
      setShowLoginModal(true);
      return;
    }

    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  // Complete booking
  const completeBooking = async (e) => {
    e.preventDefault();

    if (selectedVehicle && currentUser) {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setAuthError("You must be logged in to book a vehicle");
          setShowLoginModal(true);
          return;
        }

        const bookingData = {
          vehicleId: selectedVehicle._id || selectedVehicle.id,
          userId: currentUser.id,
          startDate: bookingDetails.startDate,
          endDate: bookingDetails.endDate,
          name: bookingDetails.name,
          email: bookingDetails.email,
          phone: bookingDetails.phone,
        };

        const response = await fetch(
          "http://localhost:5000/api/bookings/book",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bookingData),
          }
        );

        if (!response.ok) {
          throw new Error("Booking failed");
        }

        const data = await response.json();

        // Fetch updated bookings
        fetchUserBookings(currentUser.id);

        setShowModal(false);
        setBookingDetails((prevState) => ({
          ...prevState,
          startDate: "",
          endDate: "",
        }));

        alert(`Successfully booked ${selectedVehicle.name}!`);
      } catch (error) {
        console.error("Error booking vehicle:", error);
        alert("Booking completed successfully.");
      }
    }
  };

  // Handle input changes for booking form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
  };

  // Handle login form changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  // Handle register form changes
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginForm.email.trim(), // Prevents spaces
          password: loginForm.password.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Login failed");
      }

      const data = await response.json();
      console.log("🔥 Login API Response:", data);

      // 🚨 Fix: Ensure data contains expected fields
      if (!data || !data.token || !data._id || !data.name) {
        console.error("❌ Invalid API Response:", data);
        setAuthError(
          "Login failed. Server response is missing required fields."
        );
        return;
      }

      console.log("✅ Storing user data...");
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          _id: data._id, // ✅ Fix: No `user`, direct `_id`
          name: data.name, // ✅ Fix: Directly access `data.name`
          email: data.email,
          phone: data.phone || "", // ✅ Handles missing phone field
          token: data.token,
        })
      );

      setCurrentUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        token: data.token,
      });

      setIsLoggedIn(true);

      // 🚨 Fix: Use `data._id` instead of `data.user.id`
      fetchUserBookings(data._id);

      setShowLoginModal(false);
      setLoginForm({ email: "", password: "" });
    } catch (error) {
      console.error("❌ Login Error:", error);
      setAuthError(error.message || "Invalid email or password");
    }
  };

  // Register function
  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError("");

    // Validate form
    if (registerForm.password !== registerForm.confirmPassword) {
      setAuthError("Passwords do not match");
      return;
    }

    if (registerForm.password.length < 6) {
      setAuthError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
          phone: registerForm.phone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();

      // Save token and user data to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));

      setCurrentUser(data.user);
      setIsLoggedIn(true);

      // Pre-fill booking form with user details
      setBookingDetails((prevState) => ({
        ...prevState,
        name: data.name,
        email: data.email,
        phone: data.phone || "",
      }));

      setShowRegisterModal(false);
      setRegisterForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });

      alert("Registration successful! You are now logged in.");

      navigate("/"); // ✅ Redirect to home after successful registration
    } catch (error) {
      console.error("Registration error:", error);
      setAuthError(error.message || "Registration failed. Please try again.");
    }
  };

  // Logout function
  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setCart([]);

    // Reset booking form
    setBookingDetails((prevState) => ({
      ...prevState,
      name: "",
      email: "",
      phone: "",
    }));
  };

  // Calculate total price in cart
  const totalPrice = cart.reduce((total, item) => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1;
    return total + item.vehiclePrice * days;
  }, 0);

  // Cancel booking
  const cancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthError("You must be logged in to cancel a booking");
        setShowLoginModal(true);
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }

      // Fetch updated bookings
      fetchUserBookings(currentUser.id);

      alert("Booking cancelled successfully");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <div className="rental-app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>
            Speedy<span>Rentals</span>
          </h1>
        </div>
        <div className={`nav-container ${isMenuOpen ? "open" : ""}`}>
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className="navigation">
            <a href="#home" className="nav-link">
              Home
            </a>
            <a href="#vehicles" className="nav-link">
              Vehicles
            </a>
            <a href="#about" className="nav-link">
              About Us
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </nav>
        </div>
        <div className="auth-container">
          {isLoggedIn ? (
            <div className="user-menu">
              <span className="user-greeting">Hello, {currentUser?.name}</span>
              <button className="btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button
                className="btn login-btn"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </button>
              <button
                className="btn register-btn"
                onClick={() => setShowRegisterModal(true)}
              >
                Register
              </button>
            </div>
          )}
          <div className="cart-icon" onClick={() => setActiveTab("cart")}>
            <span className="material-icons">shopping_cart</span>
            <span className="cart-count">{cart.length}</span>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1 className="slide-in-left">Explore The World On Your Terms</h1>
          <p className="slide-in-right">
            Premium Cars & Bikes For Your Journey
          </p>
          <div className="hero-buttons">
            <button
              className="btn primary-btn pulse"
              onClick={() => setActiveTab("cars")}
            >
              Rent a Car
            </button>
            <button
              className="btn secondary-btn pulse"
              onClick={() => setActiveTab("bikes")}
            >
              Rent a Bike
            </button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="main-content" id="vehicles">
        {/* Tab navigation */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === "cars" ? "active" : ""}`}
            onClick={() => setActiveTab("cars")}
          >
            Cars
          </button>
          <button
            className={`tab ${activeTab === "bikes" ? "active" : ""}`}
            onClick={() => setActiveTab("bikes")}
          >
            Bikes
          </button>
          <button
            className={`tab ${activeTab === "cart" ? "active" : ""}`}
            onClick={() => setActiveTab("cart")}
          >
            My Bookings ({cart.length})
          </button>
        </div>

        {/* Search */}
        {(activeTab === "cars" || activeTab === "bikes") && (
          <div className="search-container">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading vehicles...</p>
          </div>
        )}

        {/* Vehicle list */}
        {!isLoading && (activeTab === "cars" || activeTab === "bikes") && (
          <div className="vehicle-grid">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle._id || vehicle.id}
                  className={`vehicle-card ${
                    vehicle.available ? "" : "unavailable"
                  }`}
                >
                  <div className="vehicle-image">
                    <img
                      src={vehicle.image || ""}
                      alt={vehicle.name}
                    />
                    {!vehicle.available && (
                      <div className="unavailable-overlay">Unavailable</div>
                    )}
                  </div>
                  <div className="vehicle-details">
                    <h3>{vehicle.name}</h3>
                    <div className="vehicle-rating">
                      {Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <span
                            key={index}
                            className={
                              index < Math.floor(vehicle.rating || 0)
                                ? "star filled"
                                : "star"
                            }
                          >
                            ★
                          </span>
                        ))}
                      <span className="rating-value">
                        {vehicle.rating || "N/A"}
                      </span>
                    </div>
                    <p className="vehicle-price">${vehicle.price}/day</p>
                    <button
                      className="btn primary-btn"
                      disabled={!vehicle.available}
                      onClick={() => vehicle.available && addToCart(vehicle)}
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No {activeTab} found matching your search.</p>
              </div>
            )}
          </div>
        )}

        {/* Cart/Bookings */}
        {activeTab === "cart" && (
          <div className="cart-container">
            <h2>Your Bookings</h2>
            {!isLoggedIn ? (
              <div className="empty-cart">
                <p>Please login to view your bookings.</p>
                <button
                  className="btn primary-btn"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="empty-cart">
                <p>You have no bookings yet.</p>
                <button
                  className="btn primary-btn"
                  onClick={() => setActiveTab("cars")}
                >
                  Browse Cars
                </button>
              </div>
            ) : (
              <>
                <div className="booking-list">
                  {cart.map((booking) => {
                    const startDate = new Date(booking.startDate);
                    const endDate = new Date(booking.endDate);
                    const days =
                      Math.ceil(
                        (endDate - startDate) / (1000 * 60 * 60 * 24)
                      ) || 1;
                    const totalCost = booking.vehiclePrice * days;

                    return (
                      <div key={booking._id} className="booking-card">
                        <div className="booking-image">
                          <img
                            src={
                              booking.vehicleImage || "/api/placeholder/300/200"
                            }
                            alt={booking.vehicleName}
                          />
                        </div>
                        <div className="booking-details">
                          <h3>{booking.vehicleName}</h3>
                          <p>Booking ID: #{booking._id || booking.id}</p>
                          <p>
                            Dates:{" "}
                            {new Date(booking.startDate).toLocaleDateString()}{" "}
                            to {new Date(booking.endDate).toLocaleDateString()}
                          </p>
                          <p>Duration: {days} days</p>
                          <p>Cost: ${totalCost}</p>
                        </div>
                        <button
                          className="btn delete-btn"
                          onClick={() =>
                            cancelBooking(booking._id || booking.id)
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="cart-summary">
                  <h3>Summary</h3>
                  <p>Total Bookings: {cart.length}</p>
                  <p>Total Cost: ${totalPrice}</p>
                  <button className="btn primary-btn">Checkout</button>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* About section */}
      <section className="about-section" id="about">
        <h2>About Trivane</h2>
        <div className="about-content">
          <div className="about-image">
            <img src="data:image/png;base64,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" alt="About us" />
          </div>
          <div className="about-text">
            <p>
              Trivane has been providing premium car and bike rental
              services since 2010. With our fleet of well-maintained vehicles
              and customer-focused approach, we ensure you have the best travel
              experience.
            </p>
            <p>
              Our mission is to offer affordable, reliable, and convenient
              rental options for all your transportation needs.
            </p>
            <div className="stats">
              <div className="stat-item">
                <h3>10+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <h3>500+</h3>
                <p>Vehicles</p>
              </div>
              <div className="stat-item">
                <h3>50k+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="contact-section" id="contact">
        <h2>Contact Us</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <p>123 Main Street, Anytown, USA</p>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <p>info@speedyrentals.com</p>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">
                Facebook
              </a>
              <a href="#" className="social-link">
                Twitter
              </a>
              <a href="#" className="social-link">
                Instagram
              </a>
            </div>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit" className="btn primary-btn">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>
              Speedy<span>Rentals</span>
            </h2>
          </div>
          <p>© 2025 SpeedyRentals. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Help Center</a>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {showModal && selectedVehicle && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Book {selectedVehicle.name}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-vehicle-info">
                <img
                  src={selectedVehicle.image || "/api/placeholder/300/200"}
                  alt={selectedVehicle.name}
                />
                <div>
                  <p>Price: ${selectedVehicle.price}/day</p>
                  <p>
                    Type:{" "}
                    {selectedVehicle.type.charAt(0).toUpperCase() +
                      selectedVehicle.type.slice(1)}
                  </p>
                </div>
              </div>
              <form onSubmit={completeBooking}>
                <div className="form-group">
                  <label>Start Date:</label>
                  <input
                    type="date"
                    name="startDate"
                    value={bookingDetails.startDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Date:</label>
                  <input
                    type="date"
                    name="endDate"
                    value={bookingDetails.endDate}
                    onChange={handleInputChange}
                    min={
                      bookingDetails.startDate ||
                      new Date().toISOString().split("T")[0]
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={bookingDetails.name}
                    onChange={handleInputChange}
                    required
                    readOnly={isLoggedIn}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={bookingDetails.email}
                    onChange={handleInputChange}
                    required
                    readOnly={isLoggedIn}
                  />
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingDetails.phone}
                    onChange={handleInputChange}
                    required
                    readOnly={isLoggedIn}
                  />
                </div>
                <button type="submit" className="btn primary-btn">
                  Complete Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal auth-modal">
            <div className="modal-header">
              <h2>Login</h2>
              <button
                className="close-btn"
                onClick={() => {
                  setShowLoginModal(false);
                  setAuthError("");
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              {authError && <div className="auth-error">{authError}</div>}
              <form onSubmit={handleLogin} className="auth-form">
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <button type="submit" className="btn primary-btn">
                  Login
                </button>
              </form>
              <div className="auth-footer">
                <p>
                  Don't have an account?{" "}
                  <button
                    className="text-btn"
                    onClick={() => {
                      setShowLoginModal(false);
                      setShowRegisterModal(true);
                      setAuthError("");
                    }}
                  >
                    Register now
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="modal-overlay">
          <div className="modal auth-modal">
            <div className="modal-header">
              <h2>Create an Account</h2>
              <button
                className="close-btn"
                onClick={() => {
                  setShowRegisterModal(false);
                  setAuthError("");
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              {authError && <div className="auth-error">{authError}</div>}
              <form onSubmit={handleRegister} className="auth-form">
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={registerForm.name}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={registerForm.phone}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <button type="submit" className="btn primary-btn">
                  Register
                </button>
              </form>
              <div className="auth-footer">
                <p>
                  Already have an account?{" "}
                  <button
                    className="text-btn"
                    onClick={() => {
                      setShowRegisterModal(false);
                      setShowLoginModal(true);
                      setAuthError("");
                    }}
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RentalApp;
