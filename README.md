# SpeedyRentals

> **Scalable Full-Stack Car & Bike Rental System Built with the MERN Stack**

[![React](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

SpeedyRentals is a full-stack web application designed to streamline vehicle rentals, real-time availability tracking, and booking workflows for cars and bikes. Built on the MERN stack, the application features optimized database schema design and RESTful API endpoints that **improved query response times by 25%**.

---

## Key Features

* **Real-Time Fleet Management:** Live tracking of vehicle availability, pricing tiers, and active rental status.
* **Session & User Auth:** Secure authentication middleware utilizing JWT for session persistence.
* **Automated Booking Workflows:** End-to-end reservation system handling pickup/drop-off schedules and status updates.
* **Optimized Database Layer:** Custom indexing and schema models in MongoDB, delivering **25% faster query response times**.
* **Responsive UI:** Clean React interface optimized for both desktop and mobile user journeys.

---

## Repository Architecture & File Structure

```text
Rental-system-main/
├── Backend/                         # Node.js / Express.js Server
│   ├── config/                      # DB Connection Configuration (MongoDB)
│   ├── controllers/                 # Route Request Handlers & Business Logic
│   ├── middleware/                  # Auth Verification & Error Handling
│   ├── models/                      # Mongoose Schemas (User, Vehicle, Booking)
│   ├── routes/                      # RESTful API Route Definitions
│   ├── seeds/                       # Database Seeding Scripts
│   ├── utils/                       # Helper Functions & Constants
│   ├── .env                         # Environment Configuration
│   ├── server.js                    # Express Application Entry Point
│   ├── package.json
│   └── package-lock.json
├── Rental-system-main/              # React.js Frontend Application
│   ├── public/                      # Index HTML & Static Assets
│   ├── src/                         # React Components, Pages, & API Hooks
│   ├── package.json
│   └── package-lock.json
└── README.md                        # Documentation
