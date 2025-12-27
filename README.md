# 💰 Money Manager - Your Complete Financial Companion

<div align="center">
  <img src="https://img.shields.io/badge/Angular-17-red?style=for-the-badge&logo=angular" alt="Angular 17">
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/TailwindCSS-3.0-blue?style=for-the-badge&logo=tailwindcss" alt="Tailwind">
  <img src="https://img.shields.io/badge/Chart.js-Visualizations-orange?style=for-the-badge&logo=chart.js" alt="Chart.js">
</div>

<div align="center">
  <h3>🚀 A modern, feature-rich money management application that helps you take control of your finances!</h3>
  <p><em>Track expenses • Manage income • Build portfolio • Monitor borrowings • Visualize data</em></p>
</div>

---

## ✨ Key Features

### 💳 **Smart Transaction Management**
- 📊 **Multi-type Transactions**: Income, Expenses, and Borrowing tracking
- 🏷️ **Smart Categories**: Pre-defined categories for quick classification
- 📅 **Date-based Tracking**: Historical transaction management
- 📝 **Notes & Details**: Add context to every transaction
- 🗑️ **Easy Management**: Quick delete and edit options

### 📈 **Investment Portfolio Tracker**
- 📊 **Multi-asset Support**: Stocks, Mutual Funds, Bonds, Crypto, and more
- 💹 **Real-time P&L**: Track profits and losses instantly
- 🥧 **Visual Analytics**: Beautiful pie charts for portfolio allocation
- 📱 **Responsive Design**: Perfect on all devices

### 🤝 **Borrowing & Lending Manager**
- 👥 **People Management**: Track who you've borrowed from or lent to
- 📱 **WhatsApp Integration**: Send payment reminders directly
- ✅ **Return Status**: Mark transactions as returned/pending
- 📤 **Share Details**: Export borrowing summaries
- 🔔 **Smart Reminders**: Never forget to follow up

### 📊 **Advanced Analytics & Visualization**
- 📈 **Interactive Charts**: Bar charts, pie charts, and trend analysis
- 💰 **Balance Calculation**: Salary + Income + Portfolio - Expenses
- 📱 **Responsive Dashboard**: Beautiful UI that works everywhere
- 🎨 **Modern Design**: Gradient backgrounds and smooth animations

### 🔐 **Security & Authentication**
- 🔒 **JWT Authentication**: Secure login system
- 🛡️ **Password Encryption**: bcrypt for secure password storage
- 👤 **User Isolation**: Each user's data is completely private
- 🔐 **Route Protection**: Authenticated routes and guards

---

## 🛠️ Tech Stack

### **Frontend Powerhouse**
```typescript
🅰️ Angular 17 (Standalone Components)
🎨 Tailwind CSS (Modern Styling)
📊 Chart.js + ng2-charts (Data Visualization)
🔧 Reactive Forms (Form Management)
📱 Angular Material (UI Components)
🎭 Font Awesome (Icons)
```

### **Backend Excellence**
```javascript
🟢 Node.js + Express (Server)
🍃 MongoDB + Mongoose (Database)
🔐 JWT + bcrypt (Authentication)
🛡️ CORS + Security Middleware
📡 RESTful API Design
```

---

## 🏗️ Project Architecture

```
💰 moneyManager/
├── 🖥️ backend/
│   ├── 📊 models/
│   │   ├── User.js (User authentication)
│   │   ├── Transaction.js (Financial transactions)
│   │   └── Person.js (Borrowing contacts)
│   ├── 🛣️ routes/
│   │   ├── auth.js (Authentication endpoints)
│   │   ├── transactions.js (Transaction CRUD)
│   │   └── people.js (Contact management)
│   ├── 🛡️ middleware/
│   │   └── auth.js (JWT verification)
│   ├── ⚙️ server.js (Express server)
│   └── 📦 package.json
└── 🎨 frontend/
    └── money-manager-frontend/
        ├── 🧩 src/app/
        │   ├── 📱 components/
        │   │   ├── 🏠 dashboard.component.ts
        │   │   ├── ➕ add-transaction.component.ts
        │   │   ├── 📊 portfolio.component.ts
        │   │   ├── 🤝 borrowing-modal.component.ts
        │   │   ├── 💰 income-modal.component.ts
        │   │   ├── 💸 expenses-modal.component.ts
        │   │   ├── 📈 advanced-chart.component.ts
        │   │   ├── 🔐 login.component.ts
        │   │   ├── 📝 register.component.ts
        │   │   └── 💵 salary-setup.component.ts
        │   ├── 🔧 services/
        │   │   ├── 🔐 auth.service.ts
        │   │   ├── 💳 transaction.service.ts
        │   │   └── 👥 people.service.ts
        │   ├── 🛡️ guards/
        │   │   └── auth.guard.ts
        │   └── 🔌 interceptors/
        │       └── auth.interceptor.ts
        └── 📦 package.json
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
GET  /api/people     # 👥 Get user's contacts
POST /api/people     # ➕ Add new contact
```

---

## 🎯 Feature Highlights

### 💰 **Smart Financial Dashboard**
- Real-time balance calculation
- Visual expense/income breakdown
- Quick action buttons
- Recent transaction history
- Responsive mobile design

### 📊 **Portfolio Management**
- Multi-asset investment tracking
- Profit/Loss calculations
- Visual portfolio allocation
- Investment performance metrics

### 🤝 **Borrowing System**
- Contact management
- WhatsApp reminder integration
- Return status tracking
- Shareable summaries

### 📈 **Advanced Analytics**
- Interactive charts
- Trend analysis
- Category-wise breakdowns
- Time-based filtering

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

## 🤝 Contributing

```bash
# 🍴 Fork the repository
# 🌿 Create feature branch
git checkout -b feature/amazing-feature

# 💾 Commit changes
git commit -m 'Add amazing feature'

# 📤 Push to branch
git push origin feature/amazing-feature

# 🔄 Open Pull Request
```

---

## 📄 License

```
📜 MIT License - Feel free to use this project for learning and development!
```

---

## 🙏 Acknowledgments

- 🅰️ **Angular Team** - For the amazing framework
- 🎨 **Tailwind CSS** - For beautiful styling utilities
- 📊 **Chart.js** - For stunning data visualizations
- 🍃 **MongoDB** - For flexible database solutions
- 🚀 **Render** - For easy deployment platform

---

<div align="center">
  <h3>⭐ Star this repository if you found it helpful!</h3>
  <p><em>Built with ❤️ for better financial management</em></p>
  
  <p>
    <strong>🔗 Connect & Share:</strong><br>
    <em>Help others discover this amazing money management solution!</em>
  </p>
</div>

---

**💡 Pro Tip:** Start with the salary setup, add your monthly income, then track your daily expenses to get the most out of Money Manager!