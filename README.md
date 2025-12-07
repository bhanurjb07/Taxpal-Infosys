# TaxPal - Financial Management Platform

TaxPal is a comprehensive financial management application designed specifically for freelancers and gig workers. It helps users manage their income, track expenses, create budgets, estimate taxes, and generate detailed financial reports.

## 🌐 Live Application

**🔗 Live Demo**: [https://taxpal-infosys.vercel.app/](https://taxpal-infosys.vercel.app/)

Visit the live application to explore all features and functionality.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Features Overview](#features-overview)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🔐 Authentication & User Management
- User registration with email validation
- Secure login with JWT authentication
- Password reset via OTP email verification
- User profile management
- Notification preferences (email, SMS, push)

### 💰 Transaction Management
- Record income and expenses
- Categorize transactions (Salary, Food, Transport, Rent, etc.)
- Add custom categories
- Edit and delete transactions
- View transaction history with filtering
- Date validation (prevents future dates)

### 📊 Budget Management
- Create monthly budgets by category
- Track budget vs actual spending
- Budget health monitoring (Within Budget / Exceeded)
- View remaining budget amounts
- Update and delete budgets

### 💼 Tax Estimation
- Multi-region tax calculation support:
  - India
  - United States
  - United Kingdom
  - Australia
- Calculate taxable income with deductions
- Estimate quarterly taxes
- Track tax payment status (Q1, Q2, Q3, Q4)
- View effective tax rate

### 📈 Financial Reports
- Monthly financial reports
- Quarterly financial reports
- Export reports as PDF
- Export reports as Excel (XLSX)
- Visual charts and graphs
- Income vs Expense analysis
- Net balance calculations

### 📱 Dashboard
- Real-time financial statistics
- Total income, expenses, and net balance
- Savings rate calculation
- Tax estimate display
- Expense category breakdown (pie chart)
- Financial trends visualization (line chart)
- Upcoming bills tracker

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **Vite 5.4.2** - Build tool and dev server
- **React Router DOM 6.30.1** - Client-side routing
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Chart.js 4.5.0** - Charting library
- **React ChartJS 2 5.3.0** - React wrapper for Chart.js
- **Recharts 3.1.2** - Additional charting library
- **Axios 1.11.0** - HTTP client
- **React Toastify 11.0.5** - Toast notifications
- **jsPDF 3.0.3** - PDF generation
- **jsPDF AutoTable 5.0.2** - PDF table generation
- **XLSX 0.18.5** - Excel file generation
- **File Saver 2.0.5** - File download utility
- **Lucide React 0.542.0** - Icon library
- **React Icons 5.5.0** - Additional icons

### Backend
- **Node.js** - Runtime environment
- **Express 4.19.2** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 7.0.0** - MongoDB object modeling
- **JWT 9.0.2** - JSON Web Tokens for authentication
- **bcryptjs 3.0.2** - Password hashing
- **Nodemailer 7.0.6** - Email service
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 16.0.3** - Environment variable management

## 📁 Project Structure

```
Batch4_Taxpal_Team_1/
├── backend/
│   ├── index.js                 # Main server entry point
│   ├── package.json             # Backend dependencies
│   ├── models/                  # MongoDB models
│   │   ├── User.js
│   │   ├── Transaction.js
│   │   ├── Budget.js
│   │   ├── TaxRecord.js
│   │   └── TaxPayment.js
│   ├── routes/                  # API route handlers
│   │   ├── authRoutes.js
│   │   ├── TransRoute.js
│   │   ├── budgetRoutes.js
│   │   ├── taxRoutes.js
│   │   ├── taxPaymentRoutes.js
│   │   ├── reportRoutes.js
│   │   └── userRoutes.js
│   └── middlewares/             # Custom middleware
│       └── authMiddleware.js
│
├── frontend/
│   ├── index.html              # HTML entry point
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── postcss.config.js       # PostCSS configuration
│   └── src/
│       ├── main.jsx            # React entry point
│       ├── App.jsx             # Main App component
│       ├── api.js              # API configuration
│       ├── styles.css          # Global styles
│       ├── components/         # Reusable components
│       │   ├── Button.jsx
│       │   ├── Header.jsx
│       │   ├── Navbar.jsx
│       │   ├── Sidebar.jsx
│       │   ├── StatCard.jsx
│       │   ├── ExpenseChart.jsx
│       │   ├── FinancialTrendsChart.jsx
│       │   ├── Input.jsx
│       │   ├── OAuthButton.jsx
│       │   └── PublicHeader.jsx
│       └── pages/              # Page components
│           ├── Login.jsx
│           ├── Register.jsx
│           ├── Forgot.jsx
│           ├── Reset.jsx
│           ├── Dashboard.jsx
│           ├── Logs.jsx
│           ├── Budgeting.jsx
│           ├── TaxEstimator.jsx
│           ├── Report.jsx
│           ├── Category.jsx
│           ├── Home.jsx
│           └── Support.jsx
│
└── README.md                   # Project documentation
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for cloning the repository)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Batch4_Taxpal_Team_1
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=5001

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/taxpal
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taxpal

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (for password reset)
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-specific-password
EMAIL=your-email@gmail.com
```

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# API URL
VITE_API_URL=http://localhost:5001
# For production:
# VITE_API_URL=https://your-backend-api-url.com
```

## 🏃 Running the Application

### Development Mode

#### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5001`

#### 2. Start the Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Production Mode

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Start Backend (Production)

```bash
cd backend
npm start
```

## 📡 API Endpoints

### Authentication Routes (`/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | User login | No |
| POST | `/auth/forgot-password` | Request password reset OTP | No |
| POST | `/auth/reset-password` | Reset password with OTP | No |

### Transaction Routes (`/transactions`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/transactions` | Get all user transactions | Yes |
| POST | `/transactions` | Create a new transaction | Yes |
| PUT | `/transactions/:id` | Update a transaction | Yes |
| DELETE | `/transactions/:id` | Delete a transaction | Yes |

### Budget Routes (`/budgets`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/budgets` | Get all user budgets | Yes |
| POST | `/budgets` | Create a new budget | Yes |
| PUT | `/budgets/:id` | Update a budget | Yes |
| DELETE | `/budgets/:id` | Delete a budget | Yes |
| GET | `/budgets/check` | Check budget status | Yes |

### Tax Routes (`/taxRoutes`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/taxRoutes` | Get all tax records | Yes |
| POST | `/taxRoutes` | Create/update tax record | Yes |
| PUT | `/taxRoutes/:id` | Update a tax record | Yes |

### Tax Payment Routes (`/api/taxpayment`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/taxpayment` | Get tax payment status | Yes |
| POST | `/api/taxpayment` | Create tax payment record | Yes |
| PUT | `/api/taxpayment/:quarter` | Update quarterly payment (Q1/Q2/Q3/Q4) | Yes |

### Report Routes (`/api/reports`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/reports/monthly` | Get monthly financial data | Yes |
| GET | `/api/reports/quarterly` | Get quarterly financial data | Yes |

### User Routes (`/api/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/user/profile` | Get user profile | Yes |
| PUT | `/api/user/profile` | Update user profile | Yes |
| PUT | `/api/user/notifications` | Update notification settings | Yes |

## 🗄️ Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  country: String (required),
  income: String (required),
  notifications: {
    email: Boolean (default: true),
    sms: Boolean (default: false),
    push: Boolean (default: true)
  },
  timestamps: true
}
```

### Transaction Model
```javascript
{
  user_id: ObjectId (ref: User, required),
  type: String (enum: ["Income", "Expense"], required),
  category: String (required),
  amount: Number (required),
  date: Date (required),
  description: String
}
```

### Budget Model
```javascript
{
  user_id: ObjectId (ref: User, required),
  category: String (required),
  budgetAmount: Number (required, min: 0),
  month: String (required),
  description: String,
  timestamps: true
}
```

### TaxRecord Model
```javascript
{
  userId: ObjectId (ref: User, required),
  region: String (required),
  status: String (required),
  annualIncome: Number (required),
  deductions: Number (default: 0),
  taxableIncome: Number (required),
  estimatedQuarterlyTaxes: Number (required),
  timestamps: true
}
```

### TaxPayment Model
```javascript
{
  userId: ObjectId (ref: User, required),
  estimatedQuarterlyTaxes: Number (required),
  Q1: Boolean (default: false),
  Q2: Boolean (default: false),
  Q3: Boolean (default: false),
  Q4: Boolean (default: false),
  timestamps: true
}
```

## 🎯 Features Overview

### Dashboard
- **Financial Overview**: Displays total income, expenses, net balance, and savings rate
- **Visual Analytics**: Interactive charts showing expense categories and financial trends
- **Quick Actions**: Easy access to add income/expense transactions
- **Tax Estimates**: Real-time tax calculations based on expenses

### Transaction Management
- **Add Transactions**: Record income and expenses with categories, dates, and descriptions
- **Custom Categories**: Create and manage custom transaction categories
- **Transaction History**: View all transactions with sorting and filtering
- **Edit/Delete**: Modify or remove transactions as needed

### Budget Management
- **Create Budgets**: Set monthly budgets for different categories
- **Budget Tracking**: Monitor spending against budget limits
- **Budget Health**: Visual indicators showing if budgets are exceeded
- **Remaining Budget**: See how much budget is left for each category

### Tax Estimation
- **Multi-Region Support**: Calculate taxes for India, US, UK, and Australia
- **Tax Brackets**: Accurate tax calculations based on regional tax brackets
- **Deductions**: Factor in deductions to calculate taxable income
- **Quarterly Tracking**: Track quarterly tax payments (Q1-Q4)
- **Effective Rate**: View effective tax rate percentage

### Financial Reports
- **Monthly Reports**: Detailed monthly income and expense breakdowns
- **Quarterly Reports**: Quarterly financial summaries
- **Export Options**: Download reports as PDF or Excel files
- **Visual Charts**: Line and bar charts for better data visualization
- **Filtering**: Filter reports by month or quarter

## 🚢 Deployment

### Backend Deployment

1. Set up environment variables on your hosting platform
2. Ensure MongoDB connection string is configured
3. Deploy to platforms like:
   - Heroku
   - Railway
   - Render
   - AWS
   - DigitalOcean

### Frontend Deployment

1. Update `VITE_API_URL` in `.env` to point to your deployed backend
2. Build the application: `npm run build`
3. Deploy the `dist` folder to:
   - Vercel (recommended)
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages

### CORS Configuration

Ensure your backend CORS settings include your frontend URL:

```javascript
app.use(cors({
  origin: [
    "https://taxpal-infosys.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}));
```

## 🔒 Security Features

- **Password Hashing**: Uses bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **CORS Protection**: Configured CORS for allowed origins
- **Input Validation**: Server-side validation for all inputs
- **Date Validation**: Prevents future-dated transactions
- **User Isolation**: All data queries are user-specific

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify MongoDB is running
   - Check `MONGO_URI` in `.env` file
   - Ensure network access is allowed (for Atlas)

2. **CORS Errors**
   - Verify frontend URL is in backend CORS whitelist
   - Check `VITE_API_URL` matches backend URL

3. **Authentication Issues**
   - Clear browser localStorage
   - Verify JWT_SECRET is set correctly
   - Check token expiration

4. **Email Not Sending**
   - Verify Gmail credentials in `.env`
   - Use App-Specific Password for Gmail
   - Check email service configuration

## 📝 Scripts

### Backend Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend Scripts
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Team
Batch4_Taxpal_Team_1

## 📞 Support

For support, email bhanurjb21@gmail.com or visit the Support page in the application.
