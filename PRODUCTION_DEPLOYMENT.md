# 🚀 Production Deployment Guide

Complete guide to deploy ReelPerk ERP to production.

## 📋 Pre-Deployment Checklist

- [ ] Database configured and migrated
- [ ] Environment variables set
- [ ] SSL certificate configured
- [ ] Domain name configured
- [ ] AWS/Firebase credentials set
- [ ] Face recognition service configured
- [ ] Payment gateway integrated
- [ ] Email/SMS services configured

## 🗄️ Database Setup

### PostgreSQL Production Setup

```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb reelperk_erp

# Create user
sudo -u postgres psql -c "CREATE USER reelperk_user WITH PASSWORD 'strong_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE reelperk_erp TO reelperk_user;"

# Run migrations
psql -U reelperk_user -d reelperk_erp -f database/migrations/001_initial_schema.sql
```

## 🔐 Environment Variables

Create `.env` file in backend directory:

```env
# Production Configuration
NODE_ENV=production
PORT=5000
API_URL=https://api.reelperk.in
FRONTEND_URL=https://app.reelperk.in

# Database
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=reelperk_erp
DB_USER=reelperk_user
DB_PASSWORD=strong_password

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# AWS
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=reelperk-uploads

# Services
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
GOOGLE_MAPS_API_KEY=your-key
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
```

## 🚀 Deployment Options

### Option 1: AWS EC2 + PM2

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone <your-repo>
cd reelperk-erp/backend

# Install dependencies
npm install --production

# Start with PM2
pm2 start server.js --name reelperk-api
pm2 save
pm2 startup
```

### Option 2: Docker

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

```bash
docker build -t reelperk-api .
docker run -d -p 5000:5000 --env-file .env reelperk-api
```

### Option 3: Heroku

```bash
heroku create reelperk-api
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set NODE_ENV=production
git push heroku main
```

## 🔒 Security Hardening

1. **Enable HTTPS**: Use Let's Encrypt or AWS Certificate Manager
2. **Firewall**: Configure security groups (only allow 80, 443, 22)
3. **Rate Limiting**: Already configured in server.js
4. **Helmet**: Security headers enabled
5. **CORS**: Configure allowed origins
6. **Database**: Use connection pooling, SSL connections

## 📊 Monitoring

### PM2 Monitoring

```bash
pm2 monit
pm2 logs reelperk-api
```

### Health Check Endpoint

```bash
curl https://api.reelperk.in/health
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to server
        run: |
          ssh user@server "cd /app && git pull && pm2 restart reelperk-api"
```

## 📱 Mobile App Deployment

### iOS
1. Build archive in Xcode
2. Upload to App Store Connect
3. Submit for review

### Android
1. Generate signed AAB
2. Upload to Play Console
3. Submit for review

## ✅ Post-Deployment

1. Test all endpoints
2. Verify database connections
3. Test file uploads
4. Verify real-time features
5. Monitor logs for errors
6. Set up backup schedule
7. Configure monitoring alerts

## 🆘 Troubleshooting

### Database Connection Issues
- Check firewall rules
- Verify credentials
- Test connection: `psql -h host -U user -d database`

### Face Recognition Not Working
- Verify AWS Rekognition credentials
- Check image format and size
- Review service logs

### High Memory Usage
- Enable connection pooling
- Optimize queries
- Add caching (Redis)

---

**Your production system is ready! 🎉**

