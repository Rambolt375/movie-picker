import MovieRow from "@/components/MovieRow";
import Hero from "@/components/Hero";

export default async function Home() {
  const apiKey = process.env.TMDB_API_KEY;

  // Fetch Trending, Top Rated, and Action movies simultaneously
  const [trending, topRated, action] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`).then(res => res.json()),
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`).then(res => res.json()),
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`).then(res => res.json()),
  ]);

  return (
    <main className="relative bg-black min-h-screen pb-20 overflow-x-hidden">
      {/* 1. Featured Movie Banner */}
      <Hero movie={trending.results[0]} />

      {/* 2. Scrolling Rows - The negative margin pulls them up over the Hero */}
      <div className="relative z-10 -mt-32 space-y-12">
        <MovieRow title="Trending Today" movies={trending.results} />
        <MovieRow title="All-Time Classics" movies={topRated.results} />
        <MovieRow title="Action & Adventure" movies={action.results} />
      </div>
    </main>
  );
}