import { Router, Request, Response } from "express";
import prisma from "../config/db";
import { ShopRouteParams } from "../types/domain"; // Import your params type interface

const router = Router();

// Pass your type interface into the Request params parameter type slot
router.get("/shops/:city/:slug", async (req, res) => {
  const { city, slug } = req.params;

  try {
    const shop = await prisma.shop.findFirst({
      where: {
        city: city.toLowerCase(),
        slug: slug.toLowerCase(),
      },
      include: {
        products: {
          orderBy: {
            createdAt: 'desc'
          }
        }, // Pull all related products linked to this shop
      },
    });

    if (!shop) {
      return res.status(404).json({ message: "Storefront not found in our database records." });
    }

    return res.json(shop);
  } catch (error) {
    console.error("Backend shop fetch error:", error);
    return res.status(500).json({ message: "Database failure." });
  }
});
export default router;