# Deployment Guide

## 🚀 Vercel Frontend Deployment

### Prerequisites
- Vercel account (free tier available)
- GitHub repository
- Backend deployed separately

### Step 1: Prepare Repository
```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: banking-management-system
# - Directory: ./reactfrontend
# - Override settings? Y
# - Build command: npm run build
# - Output directory: build
# - Development command: npm start
```

#### Option B: Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework**: Create React App
   - **Root Directory**: `reactfrontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### Step 3: Environment Variables
In Vercel dashboard, add environment variables:
```
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_ENV=production
```

## 🖥️ Backend Deployment Options

### Option 1: Railway (Recommended for Spring Boot)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Option 2: Heroku
```bash
# Install Heroku CLI
# Create Procfile in final/ directory:
echo "web: java -jar target/*.jar" > final/Procfile

# Deploy
heroku create your-banking-backend
heroku config:set JAVA_TOOL_OPTIONS=-Xmx300m
git subtree push --prefix final heroku main
```

### Option 3: AWS Elastic Beanstalk
1. Package application: `./mvnw clean package`
2. Upload JAR to Elastic Beanstalk
3. Configure environment variables

## 🗄️ Database Deployment

### Option 1: PlanetScale (MySQL)
1. Create account at https://planetscale.com
2. Create database
3. Import schema using provided SQL file
4. Update connection string in backend

### Option 2: AWS RDS
1. Create MySQL RDS instance
2. Import schema
3. Configure security groups
4. Update connection details

### Option 3: Railway Database
```bash
railway add mysql
railway run mysql < wileyfinalsql.sql
```

## 📝 Production Configuration

### Frontend Environment Variables
```env
REACT_APP_API_URL=https://your-backend.com
REACT_APP_ENV=production
```

### Backend Environment Variables
```env
SPRING_DATASOURCE_URL=jdbc:mysql://your-db-host:3306/bankDB
SPRING_DATASOURCE_USERNAME=your-username
SPRING_DATASOURCE_PASSWORD=your-password
SPRING_PROFILES_ACTIVE=production
```

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Update backend CORS configuration for production domain
   - Add your Vercel domain to allowed origins

2. **Build Failures**
   - Check Node.js version (use Node 16+)
   - Clear node_modules and reinstall
   - Check for missing dependencies

3. **API Connection Issues**
   - Verify backend URL in environment variables
   - Check backend health endpoint
   - Ensure proper HTTPS configuration

4. **Database Connection**
   - Verify connection string format
   - Check firewall/security group settings
   - Test connection from backend logs

## ✅ Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Backend deployed and accessible
- [ ] Database deployed with schema imported
- [ ] Environment variables configured
- [ ] CORS configured for production domain
- [ ] Frontend deployed to Vercel
- [ ] All API endpoints tested in production
- [ ] SSL certificates configured
- [ ] Performance optimization completed

## 🎯 Post-Deployment

1. **Monitor Performance**
   - Use Vercel Analytics
   - Monitor backend logs
   - Set up error tracking

2. **Security**
   - Enable HTTPS everywhere
   - Configure proper CORS policies
   - Set up rate limiting

3. **Backup Strategy**
   - Regular database backups
   - Code repository backups
   - Environment configuration backups

---

**Need Help?** Check the main README.md or create an issue in the repository.