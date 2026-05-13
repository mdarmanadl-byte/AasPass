import express from 'express';
// @ts-ignore
import cors from 'cors'
import dotenv from 'dotenv';

import ShopRoutes from './app/api/ShopRoutes';
import ProductRoutes from './app/api/ProductRoutes';
import VendorRoutes from './app/api/VendorRouts';
dotenv.config();

const app = express();


// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Safe buffer limit for capturing phone photo strings

// Map API Routes
app.use("/api/shops", ShopRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/vendors", VendorRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

