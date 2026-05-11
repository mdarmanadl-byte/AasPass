# LocalLink: Universal Hyperlocal AI Catalog Platform

LocalLink is a high-utility, hyper-local SaaS platform designed to digitize small vendors and shops (like "Shiwam Automobile in Gaya") who cannot build or manage their own websites. It provides an instant digital presence with zero technical friction.

## 🚀 The Vision
Most small vendors fail at digitalization because of the complexity of data entry. LocalLink solves this by using **AI Voice-to-Catalog** and **Image Recognition** to allow vendors to manage their shops by simply talking or taking photos.

## ✨ Key Features
- **Dynamic SEO URLs:** Automatically generates search-friendly paths like `locallink.com/gaya/shiwam-automobile`.
- **AI Voice Onboarding:** Vendors can say *"Item is car windshield and price 50 rupees"*—the AI parses this unstructured speech and updates the catalog.
- **WhatsApp Checkout:** Removes the need for complex payment gateways. Users contact vendors directly via WhatsApp with pre-filled product details.
- **Universal Dashboard:** A city-wide discovery portal for users to find shops, products, and categories.
- **Digital Business Cards:** Automatically generated QR codes for physical storefronts.

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Database:** PostgreSQL with Prisma ORM
- **AI Engine:** Llama 3 (via Groq for low latency) & OpenAI Vision API
- **Authentication:** Clerk (Phone-number login)
- **Storage:** Cloudinary (Product images)
- **UI:** Tailwind CSS + Framer Motion (for smooth transitions)

## 📁 Project Structure
```text
aaspaas/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── index.js          # Entry point
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/          # App Router (Next.js)
│   │   └── components/
│   ├── tailwind.config.js
│   └── package.json
├── package.json          # Root scripts
└── .gitignore

## ⚙️ Installation & Setup
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/locallink.git](https://github.com/your-username/locallink.git)
   cd locallink
   2. **Install dependencies:**
   ```bash
   npm install
   3. **Environment Variables:**
   Create a `.env` file and add your keys for PostgreSQL, Groq/OpenAI, and Clerk.
4. **Database Sync:**
   ```bash
   npx prisma db push
   5. **Run Development Server:**
   ```bash
   npm run dev
   
## 📈 Roadmap
- [ ] Multi-lingual voice support (Hindi, Bhojpuri, Magahi etc.)
- [ ] Vendor Analytics Dashboard (Track WhatsApp clicks)
- [ ] AI-Generated WhatsApp Status Images for marketing
- [ ] PWA support for offline-first catalog management
