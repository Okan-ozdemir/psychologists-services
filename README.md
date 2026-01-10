
# Psychologist Link - Professional Mental Health Platform

## Project Overview
A modern web application designed for a psychologist service provider. It allows users to browse qualified specialists, filter them by various criteria, manage a list of favorites, and book individual appointments.

## Core Features
- **Authentication**: Secure login and registration using Firebase Auth.
- **Dynamic Catalog**: Browse specialists with real-time sorting (Alphabetical, Price, Rating).
- **Pagination**: "Load More" functionality with database fetching.
- **Favorites System**: Private favorites list for registered users stored in Firebase Realtime Database.
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
- ✅ 3 pages (Home, Psychologists, Favorites) with React Router routing
- ✅ Sorting by name, price, rating on Psychologists page
- ✅ Load more functionality (3 cards initially, then load more)
- ✅ Favorites system with Firebase Realtime Database persistence
- ✅ Firebase authentication (registration, login, logout)
- ✅ Psychologist cards with read more expansion
- ✅ Appointment booking modal
- ✅ Responsive design (320px to 1440px)
- ✅ Vite bundler, no console errors
- ✅ Modal close by X button, backdrop click, and Esc key
- ✅ Firebase Realtime Database for psychologists collection and user favorites
- ✅ Form validation with react-hook-form & yup (AuthModal and AppointmentModal)
- ✅ State persistence across page refreshes

**Note:** The project now uses real Firebase integration. To populate the psychologists data, you can either:
1. Use the Firebase console to add data to the `psychologists` collection
2. Run a population script (populateFirebase.js is provided but needs adjustment for ES modules)
3. Import the data from constants.tsx manually

## Links
- **Technical Specification**: Provided in the project requirements.
- **Design**: Based on the technical specification examples.
- **Live Demo**: Currently running locally at http://localhost:3002/ - deployment pending

## Deployment Status
The project is fully functional locally. To deploy:
1. Run `npm run build` to create production build
2. Deploy the `dist` folder to Netlify, GitHub Pages, or Vercel
3. Update the live demo link above
