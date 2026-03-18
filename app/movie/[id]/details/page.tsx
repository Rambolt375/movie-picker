import Link from "next/link";

export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const apiKey = process.env.TMDB_API_KEY!;
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
    );
    const data = await res.json();
    const movie = await data; // This is the result of your movie details fetch

    const releaseYear = movie.release_date?.split("-")[0] || "N/A";
    const rating = movie.vote_average?.toFixed(1); // Turns 8.421 into 8.4
    const hours = Math.floor(movie.runtime / 60);
    const minutes = movie.runtime % 60 > 0 ? movie.runtime % 60 : ""; // Only show minutes if it's greater than 0

    async function getRecommendations(movieId: string, apiKey: string) {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}`
        );
        const data = await res.json();

        // Limit to the first 6 recommendations
        return data.results?.slice(0, 8) || [];
    }

    const recommendations = await getRecommendations(id, apiKey);

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl">
                {/* Poster */}
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="md:w-96 rounded-xl shadow-2xl"
                />

                {/* Text Info */}
                <div className="flex-1 space-y-4">
                    <h1 className="text-4xl font-bold">{movie.title} <span className="text-gray-400">({releaseYear})</span></h1>

                    <div className="flex items-center gap-4 text-yellow-400 font-semibold">
                        <span>⭐ {rating}</span>
                        <span className="text-gray-500">|</span>
                        <span className="text-gray-300">{hours}h {minutes}m</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {movie.genres?.map((genre: any) => (
                            <span
                                key={genre.id}
                                className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-gray-300"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <p className="text-lg text-gray-300 leading-relaxed italic border-l-4 border-blue-500 pl-4">
                        {movie.tagline}
                    </p>

                    <p className="text-gray-200 text-lg">
                        {movie.overview}
                    </p>

                    <Link href={`/movie/${id}/watch`} className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Watch Now
                    </Link>
                </div>
            </div>

            {/* Recommendations Section */}
            <div className="max-w-6xl mx-auto p-8">
                <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
                    {recommendations.map((movie: any) => (
                        <Link key={movie.id} href={`/movie/${movie.id}/details`} className="min-w-37.5 md:min-w-50 transition-transform hover:scale-105">
                            <div className="rounded-lg overflow-hidden bg-zinc-800">
                                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="w-full aspect-2/3 object-cover" />
                                <p className="p-2 text-sm truncate">{movie.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

