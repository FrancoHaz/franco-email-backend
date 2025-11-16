const dotenv = require('dotenv');
dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
  sessionSecret: process.env.SESSION_SECRET || 'change-me',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
};

module.exports = config;

