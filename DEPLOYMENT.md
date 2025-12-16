# Deployment Guide for Render

## Backend Deployment Steps

### 1. Prepare Repository
- Push your code to GitHub
- Ensure `.env` is in `.gitignore`
- Keep `.env.example` for reference

### 2. Deploy on Render
1. Go to [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `money-manager-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 3. Environment Variables
Add these environment variables in Render dashboard:

```
MONGODB_URI=mongodb+srv://pabloyuricho_db_user:Orange8@cluster0.ce0pwlj.mongodb.net/moneymanager?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
NODE_ENV=production
PORT=5000
```

### 4. Important Notes
- **MONGODB_URI**: Must include database name (`moneymanager`)
- **JWT_SECRET**: Use a strong, unique secret for production
- **NODE_ENV**: Set to `production`
- **PORT**: Render will override this, but keep it for local development

## Frontend Deployment Steps

### 1. Update API URL
Update the API base URL in your Angular services to point to your deployed backend:

```typescript
// In auth.service.ts and transaction.service.ts
private apiUrl = 'https://your-backend-url.onrender.com/api';
```

### 2. Build and Deploy
1. Build the Angular app: `ng build`
2. Deploy the `dist/money-manager-frontend` folder to:
   - Netlify
   - Vercel
   - Render Static Site
   - GitHub Pages

## Troubleshooting

### MongoDB Connection Issues
- Verify MONGODB_URI is correctly set in Render environment variables
- Ensure MongoDB Atlas allows connections from all IPs (0.0.0.0/0)
- Check that the database name is included in the URI

### CORS Issues
- Backend already includes CORS middleware
- If issues persist, update CORS origin to your frontend URL

### Environment Variables
- Double-check all environment variables are set in Render
- Restart the service after adding/updating environment variables