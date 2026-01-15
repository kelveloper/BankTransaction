# Banking Management System

A professional, full-stack banking management application designed for bank employees to manage customer accounts, transactions, and banking operations efficiently.

## 🏦 Overview

This comprehensive banking management system provides a clean, corporate interface for bank staff to handle daily banking operations including customer management, account administration, transaction processing, and analytics reporting.

## ✨ Key Features

### **Customer Management**
- Add, edit, and delete customer profiles
- Advanced search and filtering by name, email, or bank
- Customer account associations
- Bank PIN management
- Contact information tracking

### **Account Management** 
- Create and manage checking/savings accounts
- Set custom interest rates
- Balance tracking and updates
- Account-to-customer relationship management
- Account deletion with proper validation

### **Transaction Processing**
- Process deposits and withdrawals
- Inter-account transfers
- Transaction history tracking
- Real-time balance updates
- Transaction categorization and reporting

### **Analytics & Reporting**
- System-wide statistics dashboard
- Customer distribution across banks
- Transaction volume analysis
- Account balance summaries
- Visual data representation with charts

### **Multi-Bank Support**
- Wells Fargo
- Bank of America
- JP Morgan Chase
- CitiBank

## 🛠 Technology Stack

### **Frontend**
- **React 18.2.0** - Modern UI library
- **Material-UI (MUI) 5.15** - Professional component library
- **React Router 6.21** - Client-side routing
- **Chart.js 4.4** - Data visualization
- **Tailwind CSS 3.4** - Utility-first styling

### **Backend**
- **Spring Boot 3.2.1** - Enterprise Java framework
- **Spring Web** - RESTful API development
- **Spring JDBC** - Database connectivity
- **Maven** - Dependency management
- **Java 17** - Programming language

### **Database**
- **MySQL 8.0** - Relational database
- **JDBC Template** - Database operations
- **Connection pooling** - Performance optimization

### **Development Tools**
- **Spring Boot DevTools** - Hot reload
- **JUnit** - Unit testing framework
- **Maven Wrapper** - Build automation

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **Java 17** or higher
- **MySQL 8.0** or higher
- **Maven** (or use included wrapper)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BankTransaction
   ```

2. **Database Setup**
   ```bash
   # Start MySQL server
   brew services start mysql  # macOS
   # or
   sudo systemctl start mysql  # Linux
   
   # Create database and import schema
   mysql -u root -p -e "CREATE DATABASE bankDB;"
   mysql -u root -p bankDB < wileyfinalsql.sql
   ```

3. **Backend Setup**
   ```bash
   cd final
   chmod +x mvnw
   ./mvnw spring-boot:run
   ```
   Backend will start on `http://localhost:8080`

4. **Frontend Setup**
   ```bash
   cd reactfrontend
   npm install
   npm start
   ```
   Frontend will start on `http://localhost:3000`

## 📊 Database Schema

### Core Tables
- **customers** - Customer personal information
- **accounts** - Bank account details
- **transactions** - Transaction records
- **banks** - Partner bank information

### Relationship Tables
- **customers_accounts** - Customer-Account associations
- **accounts_transactions** - Account-Transaction relationships  
- **bank_customers** - Bank-Customer relationships

## 🔗 API Endpoints

### Customer Management
```
GET    /api/customers              # Get all customers
GET    /api/customers/{id}         # Get customer by ID
POST   /api/customers/add          # Create new customer
PUT    /api/customers/{id}         # Update customer
DELETE /api/customers/{id}         # Delete customer
```

### Account Management
```
GET    /api/accounts               # Get all accounts
GET    /api/accounts/{id}          # Get account by ID
GET    /api/accounts/customer/{id} # Get accounts for customer
POST   /api/accounts/add/{customerId} # Create account for customer
PUT    /api/accounts/update        # Update account
DELETE /api/accounts/delete/{id}   # Delete account
```

### Transaction Processing
```
GET    /api/transactions           # Get all transactions
GET    /api/transactions/account/{id} # Get transactions for account
POST   /api/add/{accountId}        # Add transaction to account
POST   /api/transfer               # Transfer between accounts
```

### Bank Analytics
```
GET    /api/banks                  # Get all banks
GET    /api/banks/customers/{id}   # Get customers by bank
GET    /api/banks/customers/count  # Get total customer count
GET    /api/banks/deposit/{id}     # Get deposit sum for account
GET    /api/banks/withdraw/{id}    # Get withdrawal sum for account
```

## 🎨 User Interface

### Professional Design
- Clean, corporate aesthetic suitable for banking environments
- Muted color palette with professional typography
- Intuitive navigation with clear visual hierarchy
- Responsive design for desktop and tablet use

### Key Pages
- **Dashboard** - System overview and quick actions
- **Customer Management** - Search, add, edit customers
- **Account Management** - Account creation and administration
- **Transaction Processing** - Handle deposits, withdrawals, transfers
- **Bank Analytics** - Reports and data visualization

## 🧪 Testing

Run the included unit tests:

```bash
cd final
./mvnw test
```

Test files include:
- `AccountDaoImplTest.java`
- `CustomerDaoImplTests.java`
- `TransactionDaoImplTest.java`

## 🚀 Production Deployment

### Backend Deployment
1. Package the application:
   ```bash
   ./mvnw clean package
   ```
2. Deploy the JAR file to your preferred cloud platform
3. Configure production database connection
4. Set environment variables for database credentials

### Frontend Deployment
1. Build the React application:
   ```bash
   npm run build
   ```
2. Deploy to Vercel, Netlify, or your preferred hosting platform
3. Update API base URL for production backend

## 🔧 Configuration

### Database Configuration
Update `application.properties` in `final/src/main/resources/`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bankDB?serverTimezone=UTC&useSSL=false
spring.datasource.username=root
spring.datasource.password=your_password
spring.profiles.active=database
```

### CORS Configuration
CORS is enabled for all controllers using `@CrossOrigin` annotations.

## 📈 System Requirements

### Minimum Requirements
- **CPU**: 2 cores, 2.0 GHz
- **Memory**: 4 GB RAM
- **Storage**: 1 GB available space
- **Network**: Internet connection for dependency downloads

### Recommended Requirements
- **CPU**: 4 cores, 2.5 GHz or higher  
- **Memory**: 8 GB RAM or higher
- **Storage**: 5 GB available space
- **Database**: Dedicated MySQL server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for professional banking operations**
