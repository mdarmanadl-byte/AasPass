// app/login/page.tsx
"use client";
import { SignIn } from "@clerk/nextjs";
import { AmbientBackground } from "@/components/ui/AppUi";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 relative">
      <AmbientBackground />
      
      <div className="relative z-10 w-full max-w-sm flex justify-center">
        {/* Clerk handles the phone input, SMS sending, and verification UI natively */}
        <SignIn 
          routing="hash" 
          signUpUrl="/signup"
          forceRedirectUrl="/vendor/dashboard"
        />
      </div>
    </div>
  );
}