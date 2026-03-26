import { useState } from "react";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
  if (!longUrl || longUrl.trim() === "") {
    alert("Please enter a URL");
    return;
  }

  try {
    new URL(longUrl);
  } catch {
    alert("Invalid URL");
    return;
  }

  const res = await fetch("/api/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ longUrl }),
  });

  const data = await res.json();

  if (data.shortUrl) {
    setShortUrl(data.shortUrl);
  } else {
    alert(data.error || "Something went wrong");
  }
};

 return (
  <div className="min-h-screen flex items-center justify-center px-4 bg-[#1c1c33] relative overflow-hidden">
    
    <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-500 opacity-20 blur-3xl rounded-full"></div>
    <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-indigo-500 opacity-20 blur-3xl rounded-full"></div>

    <div className="w-full max-w-2xl bg-[#262649] rounded-2xl p-16 shadow-2xl border border-[#464688] text-center">
      
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
         URL SHORTENER
      </h1>
      <p className="text-gray-400 text-sm mb-6">
        Make your links look clean & cool
      </p>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="paste your long messy link..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-[#0f0f1a] text-gray-200 placeholder-gray-500 outline-none border border-[#2a2a40] focus:border-purple-400 transition"
        />

        <button
          onClick={handleShorten}
          className="px-5 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 transition-all"
        >
          Shorten
        </button>
      </div>

      {/* Result */}
      {shortUrl && (
        <div className="mt-6 p-4 rounded-lg bg-[#0f0f1a] border border-[#2a2a40]">
          <p className="text-gray-400 text-sm mb-2">your short link</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="text-purple-400 break-all hover:underline"
          >
            {shortUrl}
          </a>
        </div>
      )}

    </div>
  </div>
);
}
