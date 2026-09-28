import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS & JSON Request Body Parsing
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/v1', apiRouter);

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Clyptus Multi-Tenant Job Portal API Backend',
    endpoints: {
      health: '/api/v1/health',
      admins: '/api/v1/admins',
      recruiters: '/api/v1/recruiters',
      creditAccount: '/api/v1/credits/account',
      creditTransactions: '/api/v1/credits/transactions',
      allocateCredits: '/api/v1/credits/allocate',
      jobs: '/api/v1/jobs',
      applications: '/api/v1/applications',
      offers: '/api/v1/offers'
    }
  });
});

// Global 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.url} not found.`
  });
});

// Start HTTP Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Clyptus Job Portal Backend running on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api/v1`);
  console.log(`=================================================`);
});
