import MovieCard from "@/components/Card";

export default async function Home() {
  // 1. Fetch the data ONCE for the whole page
  const apiKey = process.env.TMDB_API_KEY;
  const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`, { cache: "no-store" });
  const data = await response.json();
  const movies = data.results;

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* 2. Loop through the data and pass it to the Cards */}
      {movies.map((movie: any) => (
        <MovieCard 
          id={movie.id} 
          title={movie.title || "Untitled"} 
          imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}` || "https://via.placeholder.com/500x750?text=No+Image"} 
        />
      ))}
    </div>
  );
}