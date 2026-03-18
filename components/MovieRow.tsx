import Link from "next/link";
import Card from "./Card";

interface MovieRowProps {
    title: string;
    movies: any[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
    return (
        <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-white px-10">
                {title}
            </h2>

            {/* Horizontal Scroll Container */}
            <div className="flex gap-4 overflow-x-auto px-10 pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth">
                {movies.map((movie) => (
                    <Link
                        key={movie.id}
                        href={`/movie/${movie.id}/details`}
                        className="relative min-w-40 md:min-w-60 snap-start transition-transform duration-300 hover:scale-110 hover:z-20"
                    >
                        <div className="rounded-md overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full aspect-2/3 object-cover"
                            />
                            <div className="p-2">
                                <p className="text-sm font-medium text-white truncate">{movie.title}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}