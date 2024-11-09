import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  // Redirect to /auth/login automatically when the component mounts
  useEffect(() => {
    router.push("/auth/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 bg-[url('/path-to-food-background.jpg')] bg-cover bg-center bg-no-repeat bg-opacity-50">
      <div className="min-h-screen p-8 text-gray-200 backdrop-filter backdrop-brightness-50">
        {/* Optionally remove this button if automatic redirect is desired */}
        <button
          onClick={() => router.push("/auth/login")}
          className="px-6 py-2 mb-8 text-white transition-all bg-gray-700 rounded-md hover:bg-gray-600"
        >
          Login
        </button>
      </div>
    </div>
  );
}
