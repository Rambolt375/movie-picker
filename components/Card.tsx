import Link from "next/link";

export default function Card({ id, title, imageUrl }: { id: number; title: string; imageUrl: string }) {
    return (
        <Link href={`/movie/${id}`}>
            <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-100">
                <img src={imageUrl} alt={title} className="w-full h-auto" />
                <h2 className="font-bold text-lg mt-2">{title}</h2>
            </div>
        </Link>
    )
}