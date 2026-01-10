
# Psychologist Link - Professional Mental Health Platform

## Project Overview
A modern web application designed for a psychologist service provider. It allows users to browse qualified specialists, filter them by various criteria, manage a list of favorites, and book individual appointments.

## Core Features
- **Authentication**: Secure login and registration using simulated Firebase Auth.
- **Dynamic Catalog**: Browse specialists with real-time sorting (Alphabetical, Price, Rating).
- **Pagination**: "Load More" functionality simulating database fetching.
- **Favorites System**: Private favorites list for registered users with persistent state.
- **Appointment Booking**: Validated booking system for individual sessions.
- **Responsive Design**: Fully optimized for mobile (320px), tablet, and desktop (1440px).

## Technologies Used
- **React 19**: UI Library.
- **TypeScript**: Type safety and better developer experience.
- **Tailwind CSS**: Modern, responsive utility-first styling.
- **React Router Dom**: Client-side routing.
- **React Hook Form & Yup**: Robust form management and validation.
- **Lucide React**: High-quality SVG icons.

## Technical Specifications Adherence
- Minimum validation on all input fields.
- Modal windows handle Esc key, backdrop clicks, and close buttons.
- Persistence of user state and favorites in LocalStorage (simulating Firebase Realtime DB).
- 3-card initial load with incremental loading.
