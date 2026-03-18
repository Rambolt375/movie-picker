import Link from "next/link";

export default function Hero({ movie }: { movie: any }) {
    return (
        <div className="relative h-[80vh] w-full">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className="h-full w-full object-cover opacity-60"
                />
                {/* Gradient Overlay for that Netflix fade */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-[35%] left-10 max-w-xl space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
                    {movie.title}
                </h1>
                <p className="text-lg text-gray-200 line-clamp-3 drop-shadow-md">
                    {movie.overview}
                </p>
                <div className="flex gap-4 pt-4">
                    <Link
                        href={`/movie/${movie.id}`}
                        className="px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-300 transition"
                    >
                        Play Now
                    </Link>
                </div>
            </div>
        </div>
    );
}