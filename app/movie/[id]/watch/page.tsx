import Link from "next/link";

async function getRecommendations(movieId: string, apiKey: string) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}`
    );
    const data = await res.json();

    // Limit to the first 6 recommendations
    return data.results?.slice(0, 8) || [];
}

export default async function MoviePlayerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const apiKey = process.env.TMDB_API_KEY!;

    const recommendations = await getRecommendations(id, apiKey);

    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
    );
    const data = await res.json();

    return (
        <main className="flex flex-col items-center p-4 bg-black min-h-screen text-white">
            {/* Video Player Section */}
            <div className="w-full max-w-5xl aspect-video bg-zinc-900 rounded-lg overflow-hidden">
                <iframe
                    src={`https://vidsrc.me/embed/movie?tmdb=${id}`}
                    className="w-full h-full"
                    allowFullScreen
                />
            </div>

            <div className="w-full max-w-5xl px-4 md:px-0 py-10 space-y-6">
                <h1 className="text-4xl font-bold">{data.title} <span className="text-gray-400">( {data.release_date?.split("-")[0] || "N/A"} )</span></h1>

                <div className="flex items-center gap-4 text-yellow-400 font-semibold">
                    <span>⭐ {data.vote_average?.toFixed(1)}</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-300">{Math.floor(data.runtime / 60)}h {data.runtime % 60 || 0}m</span>
                </div>

                <div className="flex flex-wrap gap-2">
                    {data.genres?.map((genre: any) => (
                        <span
                            key={genre.id}
                            className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-gray-300"
                        >
                            {genre.name}
                        </span>
                    ))}
                </div>

                <p className="text-lg text-gray-300 leading-relaxed italic border-l-4 border-blue-500 pl-4">
                    {data.tagline}
                </p>

                <p className="text-gray-200 text-lg">
                    {data.overview}
                </p>
            </div>

            {/* Recommendation Carousel Section */}

            <div className="w-full max-w-5xl mt-12">
                <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>

                {/* Horizontal Scroll Container */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
                    {recommendations.map((movie: any) => (
                        <Link
                            key={movie.id}
                            href={`/movie/${movie.id}/details`}
                            className="min-w-37.5 md:min-w-50 transition-transform hover:scale-105"
                        >
                            <div className="rounded-lg overflow-hidden bg-zinc-800">
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full aspect-2/3 object-cover"
                                />
                                <p className="p-2 text-sm truncate">{movie.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}