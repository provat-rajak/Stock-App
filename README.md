# Simple Stock Market Dashboard

A full-stack web application that displays historical stock price data for a selected list of companies. The project features a Node.js backend API that serves data from a SQLite database and the Yahoo Finance API, and a clean, responsive frontend built with vanilla JavaScript and Chart.js.

## Features
- **Responsive UI**: A two-panel layout that works on both desktop and mobile devices.
- **Dynamic Data**: Fetches a list of companies from a local database.
- **Real-World Stock Data**: Pulls 1-year historical stock data from the Yahoo Finance API.
- **Interactive Charts**: Visualizes stock price history using the Chart.js library.
- **Decoupled Architecture**: A separate backend API and frontend client for better maintainability.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Data Source**: Yahoo Finance (via `yahoo-finance2` package)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charting Library**: Chart.js
- **Development**: `nodemon` for live server reloading.

## Setup and Installation

### Prerequisites
- Node.js and npm installed on your machine.

### Instructions

1.  **Clone the repository:**
    ```sh
    git clone <your-repo-link>
    cd stock-dashboard
    ```

2.  **Set up the Backend:**
    ```sh
    cd backend
    npm install
    npm run setup-db  # Run this only once to create and seed the database
    npm run dev       # Starts the server on http://localhost:3000
    ```

3.  **Launch the Frontend:**
    - Navigate to the `frontend` directory.
    - Open the `index.html` file in your preferred web browser.

The application should now be running.