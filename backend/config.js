import "dotenv/config";

export default {
  port: process.env.PORT || 8002,
  baseUrl: process.env.BASE_URL || `http://localhost:8002`,
  mongoUrl: process.env.MONGODB_URI,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  jwtSecret: process.env.JWT_SECRET
};
