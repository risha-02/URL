import supabase from "@/lib/supabaseClient";

function generateShortCode(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { longUrl } = req.body;


if (!longUrl || longUrl.trim() === "") {
  return res.status(400).json({ error: "URL is required" });
}


try {
  new URL(longUrl);
} catch {
  return res.status(400).json({ error: "Invalid URL format" });
}

  const shortCode = generateShortCode();

  const { error } = await supabase
    .from("urls")
    .insert([{ long_url: longUrl, short_code: shortCode }]);

  if (error) {
  console.error("DB Error:", error);
  return res.status(500).json({ error: "Database error" });
}

  res.status(200).json({
    shortUrl: `${req.headers.origin}/${shortCode}`,
  });
}
