import express from "express";
import bodyParser from "body-parser";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import "dotenv/config";
import session from "express-session";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";
import AssignmentsRoutes from "./Kanbas/Assignments/routes.js";
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017/kanbas";
mongoose.connect(CONNECTION_STRING);
console.log("Connected to MongoDB");
const app = express();
console.log("Environment Variables Check:");
console.log({
  NODE_ENV: process.env.NODE_ENV,
  HAS_SESSION_SECRET: !!process.env.SESSION_SECRET,
  HAS_MONGO_CONNECTION: !!process.env.MONGO_CONNECTION_STRING,
  NODE_SERVER_DOMAIN: process.env.NODE_SERVER_DOMAIN
});

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "https://prismatic-cobbler-92930a.netlify.app",
        'https://a5-final--prismatic-cobbler-92930a.netlify.app',
        "https://a6--prismatic-cobbler-92930a.netlify.app"
      ];
      console.log("Request origin:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed'));
      }
    }
  })
);

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Session:", req.session);
  console.log("Cookies:", req.headers.cookie);
  next();
});
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "whatever",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
if (process.env.NODE_ENV === "production") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
EnrollmentRoutes(app);
AssignmentsRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);
