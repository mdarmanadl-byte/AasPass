import { Router, Request, Response } from "express";
import prisma from "../config/db";
import { CreateProductInput,ProductRouteParams } from "../types/domain"; // Import your new type interface

const router = Router();

// Pass your type interface into the Request body parameter type slot
router.post("/", async (req: Request<{}, {}, CreateProductInput>, res: Response): Promise<any> => {
  try {
    const { name, price, shopId, description, imageUrl } = req.body;

    if (!name || !price || !shopId) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const cleanPrice = parseFloat(price.toString().replace(/[^0-9.]/g, ""));
    if (isNaN(cleanPrice)) {
      return res.status(400).json({ error: "Invalid price format." });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: name.trim(),
        price: cleanPrice,
        description: description || null,
        imageUrl: imageUrl || null,
        shopId: shopId,
      },
    });

    return res.status(201).json({ message: "Product listed successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database failure." });
  }
});
 // Import the type

// ... your existing POST route ...

// DELETE: Remove a product from the database by ID
router.delete("/:id", async (req: Request<ProductRouteParams>, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    // 1. Verify if the product actually exists in PostgreSQL
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found or already deleted." });
    }

    // 2. Perform cascade-safe deletion via Prisma
    await prisma.product.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Product removed successfully from catalog",
      deletedId: id
    });

  } catch (error) {
    console.error("Product Deletion Error:", error);
    return res.status(500).json({ error: "Internal Server Error during deletion." });
  }
});

export default router;