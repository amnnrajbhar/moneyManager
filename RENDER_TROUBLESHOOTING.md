# Render Deployment Troubleshooting

## Error Status 127 - Command Not Found

This error typically occurs when Render can't execute the build or start commands. Here are the solutions:

### Solution 1: Use render.yaml Configuration
The `render.yaml` file in the root directory should automatically configure your deployment. If it doesn't work:

### Solution 2: Manual Configuration in Render Dashboard
1. **Root Directory**: Set to `backend` (not `./backend`)
2. **Build Command**: `npm install`
3. **Start Command**: `npm start`
4. **Environment**: Node

### Solution 3: Check Environment Variables
Ensure these are set in Render dashboard:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure secret key
- `NODE_ENV`: `production`

### Solution 4: Verify Repository Structure
Make sure your GitHub repository has this structure:
```
moneyManager/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── ...
└── render.yaml
```

### Solution 5: Check Build Logs
In Render dashboard:
1. Go to your service
2. Click on "Logs" tab
3. Look for specific error messages during build

### Common Issues:
- **Wrong root directory**: Should be `backend`, not `./backend` or `/backend`
- **Missing package.json**: Must be in the backend folder
- **Node version**: We've specified Node >=18.0.0 in package.json
- **Environment variables**: Must be set before deployment

### Test Deployment:
After deployment, test the health endpoint:
`https://your-app-name.onrender.com/`

Should return: `{"message": "Money Manager API is running", "status": "OK"}`