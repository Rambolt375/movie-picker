"use client"; // This tells Next.js this is a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    // This pushes the user to /search?q=your-query
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-1 rounded bg-gray-800 text-white border border-gray-700"
      />
      <button type="submit" className="bg-blue-600 px-4 py-1 rounded">
        Search
      </button>
    </form>
  );
}