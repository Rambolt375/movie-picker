export default async function MoviePlayerPage({ params }: { params: { id: string } }) {
const { id } = await params;

const videoUrl = `https://vidsrc.me/embed/movie?tmdb=${id}`;

return (
    <main className="flex flex-col items-center p-4 bg-black min-h-screen">
            <div className="w-full max-w-5xl aspect-video bg-zinc-900 rounded-lg overflow-hidden shadow-2xl">
                <iframe
                src={videoUrl}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media; picture-in-picture; focus-without-user-activation"
                ></iframe>
            </div>
            
            <div className="mt-8 text-white">
                <h1 className="text-3xl font-bold">Now Watching ID: {id}</h1>
                <p className="text-gray-400 mt-2 italic">Playing from local aggregator...</p>
            </div>
    </main>
  );
}