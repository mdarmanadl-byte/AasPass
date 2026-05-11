import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mic,
  Share2,
  Globe,
  ArrowRight,
  Download,
  QrCode,
  CheckCircle,
  Sparkles,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-100">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-slate-100 focus:px-4 focus:py-2 focus:text-slate-900"
      >
        Skip to content
      </a>

      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-700/25 via-violet-700/25 to-sky-700/20 blur-3xl" />
        <div className="absolute -bottom-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-indigo-700/20 to-emerald-700/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_-20%,rgba(99,102,241,0.20),transparent_60%)]" />
      </div>

      {/* NAV */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-900/40">
              <span className="text-white font-black text-lg">
                <Image
        src="/icon.png"     // Path to your image in the /public folder
        alt="AasPaas Logo"  // Essential for SEO and accessibility
        width={800}         // Desired width
        height={600}        // Desired height
      />
              </span>
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-100">AasPaas</span>
            <span className="ml-2 hidden sm:inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              New: instant shop link + QR
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#how" className="hover:text-indigo-400 transition-colors">
              How it works
            </a>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-5 py-2.5 text-white shadow-lg shadow-indigo-900/40 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 transition"
            >
              Merchant Login
            </Link>
          </div>
        </div>
      </nav>

      <main id="main">
        {/* HERO */}
        <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200 shadow-sm">
                <Zap className="h-4 w-4 text-indigo-400" />
                Your shop becomes a website in minutes
              </div>

              <h1 className="mt-6 text-5xl font-extrabold tracking-tight sm:text-6xl leading-[1.05] text-slate-100">
                Aapki Dukaan,
                <br />
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
                  Ab Digital.
                </span>
              </h1>

              {/* URL preview */}
              <div className="mt-7 w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900/70 p-1 shadow-sm backdrop-blur">
                <div className="flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-3">
                  <div className="rounded-lg bg-slate-800 px-3 py-2 text-slate-400 font-mono text-xs sm:text-sm">
                    aaspaas.com/gaya/
                  </div>
                  <div className="font-extrabold text-indigo-300 text-base sm:text-lg">
                    shiwam-auto
                  </div>
                  <div className="ml-auto inline-flex items-center gap-2 pr-1 text-xs font-semibold text-emerald-400">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    available
                  </div>
                </div>
              </div>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                Give your shop a professional website link. Use AI voice to list items and let customers order
                directly via WhatsApp.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="/aaspaas.apk"
                  download
                  className="group flex-1 inline-flex h-[72px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 text-white shadow-xl shadow-indigo-900/40 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 transition"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/15">
                    <Download className="h-5 w-5" />
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-[10px] uppercase tracking-wide opacity-90">Download app</p>
                    <p className="text-base font-bold">Get APK</p>
                  </div>
                  <ArrowRight className="ml-1 h-5 w-5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                </a>

                <Link
                  href="/dashboard"
                  className="flex-1 inline-flex h-[72px] items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/70 px-6 font-bold text-slate-100 hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 transition"
                >
                  Explore shops <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
                <Stat label="Setup time" value="~3 min" />
                <Stat label="Shareable link" value="1 tap" />
                <Stat label="Orders" value="WhatsApp" />
              </div>
            </div>

            {/* Mock */}
            <div className="relative">
              <div aria-hidden className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-indigo-700/30 via-violet-700/20 to-sky-700/20 blur-2xl" />

              <div className="relative mx-auto w-[300px] h-[600px] rounded-[3.2rem] bg-slate-950 p-3 shadow-2xl ring-1 ring-slate-700/60">
                <div className="h-full w-full overflow-hidden rounded-[2.6rem] bg-slate-900">
                  <div className="h-44 bg-gradient-to-br from-indigo-500 to-violet-500 p-6 text-white">
                    <p className="text-xs/5 opacity-90">Online Store</p>
                    <p className="mt-1 text-lg font-extrabold">Shiwam Automobile</p>
                    <p className="mt-2 inline-flex rounded-lg bg-white/15 px-2.5 py-1 font-mono text-[10px]">
                      aaspaas.com/gaya/shiwam-auto
                    </p>
                  </div>

                  <div className="p-4 space-y-4">
                    <div className="rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-100">Your QR</p>
                        <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-bold text-emerald-300">
                          READY TO PRINT
                        </span>
                      </div>
                      <div className="mt-3 grid place-items-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-900 p-4">
                        <QrCode className="h-14 w-14 text-slate-400" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-indigo-700/40 bg-gradient-to-br from-indigo-900/40 to-violet-900/40 p-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-800 shadow-sm">
                          <Mic className="h-5 w-5 text-indigo-300" />
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-slate-100">Voice to catalog</p>
                          <p className="text-xs text-slate-400">“Brake oil 1L, ₹220”</p>
                        </div>
                      </div>
                      <div className="mt-4 h-2 w-full rounded-full bg-slate-800">
                        <div className="h-2 w-2/3 rounded-full bg-indigo-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-slate-400">
                Customers do not need the app — they scan and order.
              </p>
            </div>
          </div>
        </section>

        {/* BRANDING + QR */}
        <section className="relative py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="rounded-[2.5rem] border border-slate-700 bg-slate-900/70 p-7 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="text-slate-100 font-black text-xl">AasPaas</span>
                  <span className="rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] font-extrabold px-3 py-1.5 border border-emerald-600/30">
                    VERIFIED MERCHANT
                  </span>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-900 p-6 text-center">
                  <div className="mx-auto grid h-40 w-40 place-items-center rounded-2xl bg-slate-800">
                    <QrCode className="h-24 w-24 text-slate-200" />
                  </div>
                  <p className="mt-4 text-[10px] font-mono tracking-wide text-slate-500">
                    SCAN TO VIEW CATALOG
                  </p>
                  <p className="mt-2 font-extrabold text-indigo-300">aaspaas.com/gaya/shiwam-auto</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-100">
                Your shop is now a{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  professional website.
                </span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">
                Every shop on AasPaas gets a unique web link and a printable QR code. No need for customers
                to download the app — they just scan or click to see your products.
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  "Professional link for WhatsApp bio",
                  "Automatic QR code generation",
                  "Real-time stock management",
                  "Direct WhatsApp order notifications",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-3 text-slate-200">
                    <CheckCircle className="mt-0.5 h-5 w-5 text-indigo-400" />
                    <span className="font-semibold">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-extrabold tracking-wide text-indigo-400">FEATURES</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-100">
                Modern tools for your business
              </h2>
              <p className="mt-4 text-slate-300">
                Everything you need to go digital, sell faster, and stay organized.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <FeatureCard
                icon={<Mic className="h-5 w-5 text-indigo-300" />}
                title="AI Voice-to-Catalog"
                desc="Just speak to list. AI captures name, price, and details automatically."
              />
              <FeatureCard
                icon={<Globe className="h-5 w-5 text-indigo-300" />}
                title="Instant Website"
                desc="Get a clean, professional shop URL. No coding, no hosting headaches."
              />
              <FeatureCard
                icon={<Share2 className="h-5 w-5 text-indigo-300" />}
                title="WhatsApp Smart-Sell"
                desc="Orders arrive on WhatsApp with product and customer details."
              />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="py-20 border-t border-slate-800/80">
          <div className="mx-auto max-w-7xl px-6">
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-100">How it works</h3>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Step n="01" title="Create your shop" desc="Add your name, location, and WhatsApp number." />
              <Step n="02" title="Add products by voice" desc="Speak item name + price. Edit anytime." />
              <Step n="03" title="Share link + QR" desc="Put it in your bio. Print the QR and start getting orders." />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 shadow-sm backdrop-blur">
      <p className="text-xs font-semibold text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-extrabold text-slate-100">{value}</p>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-7 shadow-sm backdrop-blur hover:shadow-lg hover:border-slate-600 transition">
      <div className="inline-flex items-center gap-2">
        <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-extrabold text-indigo-300">{n}</span>
        <span className="text-xs font-semibold text-slate-400">Step</span>
      </div>
      <h4 className="mt-4 text-lg font-extrabold text-slate-100">{title}</h4>
      <p className="mt-2 text-slate-300 leading-relaxed">{desc}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-3xl border border-slate-700 bg-slate-900/70 p-8 shadow-sm backdrop-blur hover:shadow-xl hover:-translate-y-0.5 hover:border-slate-600 transition">
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 ring-1 ring-indigo-500/30 group-hover:ring-indigo-400/40">
        {icon}
      </div>
      <h3 className="text-xl font-extrabold tracking-tight text-slate-100">{title}</h3>
      <p className="mt-3 text-slate-300 leading-relaxed">{desc}</p>
    </div>
  );
}