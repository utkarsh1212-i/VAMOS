import express, { Application } from 'express';
// import cors from 'cors';
// import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
// import {errorHandler}  from './middlewares/errorHandler'; // Import custom error handler
import routes from './routes/v1'; // Import all routes
import envconfig from './config/env.config';

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();

// Middleware
// app.use(cors()); // Enable CORS
// app.use(morgan('dev')); // Logger middleware
app.use(helmet()); // Add basic security headers
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies



app.use(
  session({
    secret: envconfig.jwt.secret || 'secret-key',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/v1', routes); // Prefix API routes with /api/v1

// Health Check
// app.listen('/', () => {
//   console.log('Server is up and running!');
// });

// Error Handling Middleware
// app.use(errorHandler);

export default app;
