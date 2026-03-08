import Card from "@/components/Card";
import Link from "next/link";

export default async function Home() {
  // 1. Fetch the data ONCE for the whole page
  const apiKey = process.env.TMDB_API_KEY;
  const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`, { cache: "no-store" });
  const data = await response.json();
  const movies = data.results;

  return (
  <main className="p-10">
    <h1 className="text-2xl font-bold mb-6">Trending Today</h1>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies && movies.length > 0 ? (
        movies.map((movie: any) => (
          /* Move the key and the Link here! */
          <Link key={movie.id} href={`./movie/${movie.id}`} className="hover:scale-105 transition-transform">
            <Card 
              id={movie.id} // Added the missing id prop
              title={movie.title || "Untitled"} 
              imageUrl={movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : "https://via.placeholder.com/500x750?text=No+Image"
              } 
            />
          </Link>
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  </main>
);
}