export default function Card({ id, title, imageUrl }: { id: string; title: string; imageUrl: string }) {
    return (
        // <Link href={`/movie/${key}`} className="block">
        <div className="border rounded-lg overflow-hidden bg-zinc-900">
            <img src={imageUrl} alt={title} className="w-full aspect-2/3 object-cover" />
            <div className="p-3">
                <h2 className="font-semibold text-white truncate">{title}</h2>
            </div>
        </div>
        // {/* </Link> */}
    )
}