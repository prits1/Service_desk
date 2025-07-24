# Service Desk Application

A modern customer support ticketing system built with **React** and **Firebase**.

## Features

- User registration and authentication (manual & Google sign-in)
- Raise, view, and track support tickets with categories and priorities
- User dashboard with ticket stats and recent activity
- Admin panel for managing all tickets and updating statuses
- Responsive, user-friendly UI

## Tech Stack

- **Frontend:** React, React Router
- **Backend:** Firebase Authentication, Firestore Database

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/service-desk-app.git
   cd service-desk-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure Firebase:**
   - Create a `.env` file in the root directory.
   - Add your Firebase project credentials:
     ```
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
     ```

4. **Start the development server:**
   ```sh
   npm start
   ```

5. **Access the app:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

- `src/pages/` — Main app pages (Home, Login, Register, Dashboard, Admin, etc.)
- `src/components/` — Reusable UI components
- `src/routes/` — App route definitions
- `src/utils/` — Utility functions (e.g., PrivateRoute)
- `src/firebase.js` — Firebase configuration

!! Happy Development !!