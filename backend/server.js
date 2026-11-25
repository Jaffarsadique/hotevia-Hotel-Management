import express from "express";
import cors from "cors";
import hotelRoutes from "./routes/hotelRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// images are sent as data URLs (max 2 MB), so the default 100kb limit is too small
app.use(express.json({ limit: "5mb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/hotels", hotelRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// last resort error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log("Hotevia API running on http://localhost:" + PORT);
});
