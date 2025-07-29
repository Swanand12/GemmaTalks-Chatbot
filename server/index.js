import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import gemmaRoutes from "./routes/gemmaRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/gemma", gemmaRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Server is live" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
