# Money Manager Web Application

A full-stack money management application built with Angular 17 and Node.js.

## Tech Stack

**Frontend:**
- Angular 17 (Standalone Components)
- Tailwind CSS
- Reactive Forms

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing

## Project Structure

```
moneyManager/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── transactions.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    └── money-manager-frontend/
        ├── src/app/
        │   ├── components/
        │   │   ├── login.component.ts
        │   │   ├── register.component.ts
        │   │   ├── dashboard.component.ts
        │   │   └── add-transaction.component.ts
        │   ├── services/
        │   │   ├── auth.service.ts
        │   │   └── transaction.service.ts
        │   ├── guards/
        │   │   └── auth.guard.ts
        │   └── interceptors/
        │       └── auth.interceptor.ts
        └── package.json
```

## Setup Instructions

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster (M0 Free Tier)
3. Create a database user with read/write permissions
4. Get your connection string
5. Whitelist your IP address (or use 0.0.0.0/0 for development)

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moneymanager
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

Start the server:
```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend/money-manager-frontend
npm install
ng serve
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Add new transaction
- `DELETE /api/transactions/:id` - Delete transaction

## Features

- User registration and login
- JWT-based authentication
- Add income/expense transactions
- View transaction history
- Dashboard with totals (income, expenses, balance)
- Delete transactions
- Responsive design with Tailwind CSS

## Deployment to Render

### Backend Deployment

1. Push your code to GitHub
2. Go to [Render](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

### Frontend Deployment

1. Build the Angular app: `ng build`
2. Deploy the `dist/` folder to any static hosting service
3. Update the API URL in services to point to your deployed backend

## Local Development

1. Start MongoDB (or use Atlas)
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd frontend/money-manager-frontend && ng serve`
4. Open http://localhost:4200

## Environment Variables

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moneymanager
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

**Frontend (for production):**
Update API URLs in services to point to deployed backend.