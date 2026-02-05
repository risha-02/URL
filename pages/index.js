import { useState } from "react";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl }),
    });
    const data = await res.json();
    if (data.shortUrl) setShortUrl(data.shortUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-white">
          URL Shortener
        </h1>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter your long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="p-3 rounded-lg w-full outline-none"
          />

          <button
            onClick={handleShorten}
            className="bg-white text-purple-500 px-5 py-3 rounded-lg font-bold hover:bg-purple-100 transition"
          >
            Shorten
          </button>
        </div>

        {/* Result */}
        {shortUrl && (
          <p className="mt-6 text-white text-sm sm:text-lg break-all">
            Short URL:{" "}
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {shortUrl}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
