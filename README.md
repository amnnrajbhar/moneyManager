# 💰 Money Manager - Full-Stack Personal Finance Application

<div align="center">
  <img src="https://img.shields.io/badge/Angular-17.3-red?style=for-the-badge&logo=angular" alt="Angular 17.3">
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js" alt="Node.js 18+">
  <img src="https://img.shields.io/badge/MongoDB-8.0-green?style=for-the-badge&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-blue?style=for-the-badge&logo=tailwindcss" alt="Tailwind">
  <img src="https://img.shields.io/badge/Chart.js-4.5-orange?style=for-the-badge&logo=chart.js" alt="Chart.js">
  <img src="https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
</div>

<div align="center">
  <h3>🚀 Full-Stack MEAN Application for Personal Finance Management</h3>
  <p><em>A comprehensive financial tracking solution built with modern web technologies</em></p>
  <p><strong>Personal Project by Software Engineer</strong></p>
</div>

---

## 🌐 Live Demo

<div align="center">
  <p>
    <strong><a href="https://moneymanager-jade.vercel.app/">🔗 https://moneymanager-jade.vercel.app/</a></strong>
  </p>
  <p><em>Experience the live application deployed on Vercel</em></p>
</div>

---

## 📋 Project Overview

A full-stack personal finance management application demonstrating modern web development practices and enterprise-level architecture. This project showcases proficiency in the MEAN stack (MongoDB, Express.js, Angular, Node.js) with a focus on clean code, scalable architecture, and user-centric design.

### 🎯 Core Objectives

- **Full-Stack Development**: End-to-end implementation from database design to responsive UI
- **RESTful API Design**: Secure, scalable backend with JWT authentication
- **Modern Frontend**: Angular 17+ with standalone components and reactive programming
- **Data Visualization**: Interactive charts and analytics using Chart.js
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Security Best Practices**: Authentication, authorization, and data encryption

---

## ✨ Technical Features & Implementation

### 💳 **Transaction Management System**
- **Multi-type CRUD Operations**: Comprehensive transaction handling (Income, Expenses, Borrowing)
- **Category-based Classification**: Organized data structure with predefined categories
- **Temporal Data Management**: Date-based filtering and historical tracking
- **Metadata Support**: Additional context through notes and descriptions
- **Real-time Updates**: Reactive state management with RxJS observables

### 📈 **Investment Portfolio Module**
- **Multi-asset Portfolio Tracking**: Support for Stocks, Mutual Funds, Bonds, Cryptocurrency
- **Financial Calculations**: Real-time profit/loss computation algorithms
- **Data Visualization**: Dynamic pie charts and allocation breakdowns using Chart.js
- **Responsive Grid Layout**: Adaptive UI components for all screen sizes

### 🤝 **Borrowing & Lending Feature**
- **Contact Management System**: Person entity with relationship tracking
- **External Integration**: WhatsApp API integration for payment reminders
- **Status Tracking**: State management for pending/returned transactions
- **Export Functionality**: PDF generation with html2pdf library
- **Smart Notifications**: Reminder system implementation

### 📊 **Analytics & Data Visualization**
- **Interactive Charts**: Chart.js integration with ng2-charts wrapper
- **Complex Calculations**: Balance computation (Salary + Income + Portfolio - Expenses)
- **Responsive Dashboard**: CSS Grid and Flexbox layouts
- **Modern UI/UX**: Gradient designs, animations, and transitions
- **Date Range Filtering**: Advanced filtering with month/range selection

### 🔐 **Authentication & Security**
- **JWT Token-based Auth**: Stateless authentication with refresh token strategy
- **Password Security**: bcrypt hashing with salt rounds
- **User Data Isolation**: MongoDB user-specific queries with proper indexing
- **Route Guards**: Angular guards for protected routes
- **HTTP Interceptors**: Automatic token injection and error handling
- **CORS Configuration**: Secure cross-origin resource sharing

---

## 🛠️ Technology Stack

### **Frontend Architecture**
```typescript
🅰️ Angular 17.3
   • Standalone Components (Modern Angular architecture)
   • Reactive Forms with validation
   • RxJS for reactive programming
   • TypeScript 5.4 for type safety
   • Angular Router with guards
   • HTTP Client with interceptors

🎨 Styling & UI
   • Tailwind CSS 3.4 (Utility-first CSS)
   • Angular Material 17.3 (Dialog, Modals)
   • Font Awesome 6.5 (Icon library)
   • Custom CSS animations and transitions

📊 Data Visualization
   • Chart.js 4.5 (Charting library)
   • ng2-charts (Angular wrapper)
   • html2pdf (PDF generation)
```

### **Backend Architecture**
```javascript
🟢 Server & Runtime
   • Node.js 18+ (JavaScript runtime)
   • Express.js 4.18 (Web framework)
   • RESTful API design principles
   • Middleware architecture

🍃 Database
   • MongoDB 8.0 (NoSQL database)
   • Mongoose ODM (Schema modeling)
   • Indexing for performance
   • Aggregation pipelines

🔐 Security & Authentication
   • JWT (JSON Web Tokens)
   • bcryptjs (Password hashing)
   • CORS (Cross-Origin Resource Sharing)
   • Express middleware for auth

🔧 Development Tools
   • Nodemon (Auto-restart)
   • dotenv (Environment variables)
   • ESLint (Code quality)
```

---

## 🏗️ Project Architecture

### **Backend Structure (MVC Pattern)**
```
💰 backend/
├── 📊 models/                    # Data Layer (Mongoose Schemas)
│   ├── User.js                   # User schema with authentication
│   ├── Transaction.js            # Transaction schema with validation
│   └── Person.js                 # Person schema for borrowing
│
├── 🛣️ routes/                     # API Routes (Controllers)
│   ├── auth.js                   # POST /register, /login
│   ├── transactions.js           # CRUD operations for transactions
│   └── people.js                 # Contact management endpoints
│
├── 🛡️ middleware/                 # Custom Middleware
│   └── auth.js                   # JWT verification middleware
│
├── ⚙️ server.js                   # Express app configuration
├── 📦 package.json               # Dependencies & scripts
└── 🔐 .env                       # Environment variables
```

### **Frontend Structure (Component-based Architecture)**
```
🎨 frontend/money-manager-frontend/
├── 🧩 src/app/
│   ├── 📱 components/            # UI Components (Standalone)
│   │   ├── dashboard.component.ts          # Main dashboard
│   │   ├── add-transaction.component.ts    # Transaction form
│   │   ├── portfolio.component.ts          # Portfolio view
│   │   ├── borrowing-modal.component.ts    # Borrowing dialog
│   │   ├── income-modal.component.ts       # Income dialog
│   │   ├── expenses-modal.component.ts     # Expenses dialog
│   │   ├── advanced-chart.component.ts     # Chart visualization
│   │   ├── pdf-export-modal.component.ts   # PDF export dialog
│   │   ├── login.component.ts              # Authentication
│   │   ├── register.component.ts           # User registration
│   │   └── salary-setup.component.ts       # Initial setup
│   │
│   ├── 🔧 services/              # Business Logic Layer
│   │   ├── auth.service.ts       # Authentication service
│   │   ├── transaction.service.ts # Transaction HTTP calls
│   │   ├── people.service.ts     # People management
│   │   ├── pdf-export.service.ts # PDF generation
│   │   └── toast.service.ts      # Notification service
│   │
│   ├── 🛡️ guards/                # Route Protection
│   │   └── auth.guard.ts         # Authentication guard
│   │
│   └── 🔌 interceptors/          # HTTP Interceptors
│       └── auth.interceptor.ts   # Token injection
│
├── 📦 package.json               # Dependencies
└── 🎨 tailwind.config.js         # Tailwind configuration
```

---

## 🚀 Quick Start Guide

### 1️⃣ **MongoDB Atlas Setup**
```bash
# 🌐 Visit MongoDB Atlas
https://www.mongodb.com/atlas

# ✅ Create free M0 cluster
# 👤 Create database user
# 🔗 Get connection string
# 🌍 Whitelist IP (0.0.0.0/0 for dev)
```

### 2️⃣ **Backend Setup**
```bash
# 📂 Navigate to backend
cd backend

# 📦 Install dependencies
npm install

# ⚙️ Create .env file
echo "PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development" > .env

# 🚀 Start development server
npm run dev
```

### 3️⃣ **Frontend Setup**
```bash
# 📂 Navigate to frontend
cd frontend/money-manager-frontend

# 📦 Install dependencies
npm install

# 🎨 Start Angular development server
ng serve

# 🌐 Open browser
# http://localhost:4200
```

---

## 🔌 API Endpoints

### 🔐 **Authentication**
```http
POST /api/auth/register    # 📝 User registration
POST /api/auth/login       # 🔑 User login
```

### 💳 **Transactions**
```http
GET    /api/transactions     # 📊 Get user transactions
POST   /api/transactions     # ➕ Add new transaction
DELETE /api/transactions/:id # 🗑️ Delete transaction
```

### 👥 **People Management**
```http
GET

### 📊 **Portfolio Management**
```http
GET  /api/portfolio     # 📈 Get user's portfolio
POST /api/portfolio     # ➕ Add portfolio item
```

### 💰 **User Balance**
```http
GET /api/user-balance     # 💳 Get balance summary
```  /api/people     # 👥 Get user's contacts
POST /api/people     # ➕ Add new contact
```

---

## 🎯 Key Technical Implementations

### 💰 **Dashboard Architecture**
- **State Management**: RxJS BehaviorSubjects for reactive data flow
- **Performance**: Lazy loading and OnPush change detection
- **Calculations**: Real-time balance computation with observables
- **UI Components**: Reusable card components with @Input/@Output
- **Responsive Design**: CSS Grid with Tailwind breakpoints

### 📊 **Portfolio Module**
- **Data Modeling**: Complex schema with nested objects
- **Calculations**: Profit/Loss algorithms with percentage computation
- **Visualization**: Chart.js integration with dynamic data binding
- **Type Safety**: TypeScript interfaces for portfolio items

### 🤝 **Borrowing System**
- **Relational Data**: MongoDB references between collections
- **External APIs**: WhatsApp Web API integration
- **State Management**: Status tracking with enum types
- **PDF Generation**: html2pdf with custom templates

### 📈 **Analytics Engine**
- **Chart Components**: Reusable chart wrapper components
- **Data Aggregation**: MongoDB aggregation pipelines
- **Filtering Logic**: Date range and category filtering
- **Performance**: Memoization and caching strategies

---

## 🌐 Deployment Options

### 🚀 **Render Deployment (Recommended)**

**Backend:**
```bash
# 1️⃣ Push to GitHub
# 2️⃣ Connect to Render
# 3️⃣ Set build command: npm install
# 4️⃣ Set start command: npm start
# 5️⃣ Add environment variables:
#    - MONGODB_URI
#    - JWT_SECRET
#    - NODE_ENV=production
```

**Frontend:**
```bash
# 🏗️ Build for production
ng build --prod

# 📤 Deploy dist/ folder to:
# - Vercel
# - Netlify
# - Firebase Hosting
# - GitHub Pages
```

### 🐳 **Docker Deployment**
```dockerfile
# Coming soon! Docker configurations
# for easy containerized deployment
```

---

## 🎨 Screenshots & Demo

<div align="center">
  <h3>🖼️ Beautiful, Responsive Design</h3>
  <p><em>Modern gradients, smooth animations, and mobile-first approach</em></p>
</div>

```
📱 Mobile Responsive  |  🖥️ Desktop Optimized  |  🎨 Modern UI/UX
     ✅ Touch-friendly  |      ✅ Large screens    |    ✅ Gradient themes
     ✅ Swipe gestures  |      ✅ Keyboard shortcuts|    ✅ Smooth animations
     ✅ Compact layout  |      ✅ Multi-column     |    ✅ Accessible design
```

---

## 🚀 Development Highlights

### **Technical Achievements**
- ✅ Full-stack application with MEAN stack
- ✅ RESTful API with JWT authentication
- ✅ Responsive design with mobile-first approach
- ✅ Real-time data visualization with Chart.js
- ✅ PDF export functionality
- ✅ External API integration (WhatsApp)
- ✅ Secure password hashing and token management
- ✅ MongoDB aggregation and complex queries
- ✅ Angular standalone components architecture
- ✅ TypeScript for type-safe development

### **Best Practices Implemented**
- 🔒 Security: JWT, bcrypt, CORS, input validation
- 🏗️ Architecture: MVC pattern, service layer, separation of concerns
- 📝 Code Quality: TypeScript strict mode, ESLint, clean code principles
- 🎨 UI/UX: Responsive design, accessibility, user feedback (toasts)
- 🔄 State Management: RxJS observables, reactive programming
- 🧪 Error Handling: Try-catch blocks, HTTP error interceptors
- 📊 Performance: Lazy loading, change detection optimization

---

## 📄 License

```
📜 MIT License - Personal project for portfolio demonstration
```

---

## 👨‍💻 About

This project was developed as a personal portfolio piece to demonstrate full-stack development capabilities, modern web technologies, and software engineering best practices. It showcases end-to-end application development from database design to deployment.

**Technologies Demonstrated:**
- Frontend: Angular, TypeScript, Tailwind CSS, RxJS
- Backend: Node.js, Express.js, MongoDB, JWT
- Tools: Git, npm, Vercel, MongoDB Atlas

---

<div align="center">
  <p><em>Built by a Software Engineer passionate about clean code and modern web development</em></p>
  <p><strong>⭐ Star this repository if you find it useful for learning!</strong></p>
</div>