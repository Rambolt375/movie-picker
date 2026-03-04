import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-6 bg-slate-900 text-white sticky top-0 z-50">
            <div className="text-xl font-bold"><Link href="/">CineTrack 🎬</Link></div>
            <SearchBar />
            <div className="space-x-6">
                <Link href="/" className="hover:text-blue-400">Home</Link>
                <Link href="/explore" className="hover:text-blue-400">Explore</Link>
                <Link href="/watchlist" className="hover:text-blue-400">Watchlist</Link>
                <Link href="/test" className="hover:text-blue-400 text-gray-500">Test Page</Link>
            </div>
        </nav>
    )
}