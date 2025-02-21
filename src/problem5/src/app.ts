import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route";
import { database } from "./config/database";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/v1/users", userRoutes);

// Connect to database and start server
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await database.connect();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
