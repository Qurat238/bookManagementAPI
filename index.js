import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors';

dotenv.config({path:"config/config.env"});

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDB();


app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
