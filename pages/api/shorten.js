import  supabase  from "../../src/lib/supabaseClient";

// Function to generate random short code
function generateShortCode(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: "URL is required" });

    // Generate short code
    const shortCode = generateShortCode();

    // Insert into Supabase
    const { data, error } = await supabase
      .from("urls")
      .insert([{ long_url: longUrl, short_code: shortCode }])
      .select();

    if (error) return res.status(500).json({ error: error.message });

    res.status(200).json({ shortUrl: `${req.headers.origin}/${shortCode}` });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
