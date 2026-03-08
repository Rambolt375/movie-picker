import Card from "@/components/Card";
import Link from "next/link";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>; // 1. Change type to Promise
}) {
    // 2. Await the params before using them
    const fetchedParams = await searchParams;
    const query = fetchedParams.q;
    const apiKey = process.env.TMDB_API_KEY;

    // 3. Add a safety check: if no query, don't fetch!
    if (!query) {
        return <main className="p-10"><h1>Please enter a search term.</h1></main>;
    }

    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    );
    const data = await res.json();

    return (
        <main className="p-10">
            <h1>Results for: {query}</h1>
            <div className="grid grid-cols-4 gap-4">
                {data.results?.map((movie: any) => (
                    <Link key={movie.id} href={`/movie/${movie.id}`} className="hover:scale-105 transition-transform">
                        <Card 
                            id={movie.id} 
                            title={movie.title || "Untitled"} 
                            imageUrl={movie.poster_path 
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                                : "https://via.placeholder.com/500x750?text=No+Image"
                            } 
                        />
                    </Link>
                ))}
            </div>
        </main>
    );
}