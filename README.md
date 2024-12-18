# Calculator Dashboard

A modern web application structured as a Single Page Application (SPA) featuring multiple calculator types, user authentication, and state persistence.

## Features
- Basic Calculator
- Scientific Calculator
- Currency Exchange Calculator
- Time Zone Calculator
- Percentage Calculator
- Random Number Generator
- User Authentication
- State Persistence
- Notes for Calculations

## Technology Stack
- Frontend: React.js
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- Testing: Jest
- Containerization: Docker

## Requirements
- Node.js (v18 or higher)
- npm (Node Package Manager)
- MongoDB (v4.4 or higher)
- Docker Desktop
- Jest
- Web Browser (Chrome, Firefox, Safari)

## Installation & Setup

## Environment Variables

1. Insert your environment variables needed for the backend into the .env file in backend directory.
   
For JWT_SECRET, run the following command using Node.js crypto module in the terminal and put the output as the environment variable:
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

For MONGO_URI in Docker:
```
mongodb://mongodb:27017/calculator-dashboard
```
or, if desired to run MongoDB locally (mongod command):
```
mongodb://mongodb:27017/calculator-dashboard
```
2. Insert your API key for accessing the currency exchange rates API in the server.js file.
```
const API_KEY = 'ExchangeRate_API';
```

### Setup Using Docker (Recommended)
1. Install Docker Desktop
2. Clone the repository
3. Run *docker-compose up --build*
4. Access the application at http://localhost:3000

### Manual Setup
1. Clone the repository
2. Install dependencies:
```
bash 
cd frontend
npm install
cd ../backend
npm install
```
 
3. Start MongoDB service locally (currently Mongo is configured to run in Docker)
4. Start the servers:
In backend directory:
```
npm start
```
In frontend directory:
```
npm start
```
5. Access the application at http://localhost:3000

## Testing

### Testing Requirements
- Jest
```
npm install -g jest
```
- Supertest
```
npm install --save-dev supertest
```

You can run tests for both backend and frontend files:

### Testing Using Docker (Recommended)

Frontend Tests (Run in a separate terminal, while Docker is setup)
```
docker-compose exec frontend npm test
```

Backend Tests (Run in a separate terminal, while Docker is setup)
```
docker-compose exec backend npm test
```
### Manual Testing (MongoDB is configured to run in Docker)

Frontend Tests
```
cd frontend
npm test
```

Backend Tests
```
cd backend
npm test
```

## Usage

1. Login by providing an email and a password. If you are not registered yet, do that on the register page.
2. Add necessary calculators to the dashboard by clicking on the corresponding button on the sidebar.
3. Perform calculations. It is also possible to add notes.
4. All your dashboard configurations are saved. After logging out and logging back in, you will be able to continue to work on your calculations.

### Enjoy the calculator dashboard!


