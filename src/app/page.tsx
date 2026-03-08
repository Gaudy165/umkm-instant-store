"use client";

import BusinessForm from "./generate/components/BusinessForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-4xl">
        <BusinessForm />
      </div>
    </div>
  );
}
