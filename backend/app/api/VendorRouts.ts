import { Router, Request, Response } from "express";
import prisma from "../config/db";
import { OnboardVendorInput } from "../types/domain"; 

const router = Router();

// POST: Onboard a brand new vendor and their shop
router.post("/onboard", async (req: Request<{}, {}, OnboardVendorInput>, res: Response): Promise<any> => {
  try {
    const { phone, name, shopName, category, address, whatsapp, city } = req.body;

    // 1. Structural Field Validation Validation
    if (!phone || !name || !shopName || !address || !whatsapp) {
      return res.status(400).json({ error: "Please fill in all required onboarding fields." });
    }

    // 2. Generate a clean URL slug (e.g., "Shiwam Automobile" -> "shiwam-automobile")
    const generatedSlug = shopName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-");        // Replace spaces with hyphens

    // 3. Check if phone or shop slug already exists to prevent duplication crashes
    const existingShop = await prisma.shop.findUnique({ where: { slug: generatedSlug } });
    if (existingShop) {
      return res.status(400).json({ error: "A shop with this name already exists. Try adding a location descriptor." });
    }

    // 4. Atomic Database Transaction Execution
    const result = await prisma.$transaction(async (tx) => {
      // Create the User with the OWNER role
      const newUser = await tx.user.create({
        data: {
          phone: phone.trim(),
          name: name.trim(),
          role: "OWNER",
        },
      });

      // Create the Shop tied directly to that newUser.id
      const newShop = await tx.shop.create({
        data: {
          ownerId: newUser.id,
          name: shopName.trim(),
          slug: generatedSlug,
          city: city ? city.toLowerCase().trim() : "gaya",
          address: address.trim(),
          category: category || "General",
          whatsapp: whatsapp.replace(/[^0-9]/g, ""), // Keep only numbers for clean WhatsApp links
        },
      });

      return { user: newUser, shop: newShop };
    });

    return res.status(201).json({
      message: "Vendor onboarding completed flawlessly!",
      shopSlug: result.shop.slug,
      city: result.shop.city,
      shopId: result.shop.id
    });

  } catch (error: any) {
    console.error("Onboarding Database Transaction Error:", error);
    if (error.code === "P2002") {
      return res.status(400).json({ error: "This phone number is already registered under another account." });
    }
    return res.status(500).json({ error: "Internal server compilation failure during profile construction." });
  }
});

export default router;