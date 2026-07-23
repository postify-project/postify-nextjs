import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "Website URL is required" }, { status: 400 });
    }

    // Format URL
    const targetUrl = url.startsWith("http") ? url : `https://${url}`;
    const response = await fetch(targetUrl);
    const htmlText = await response.text();

    // Basic extraction logic (Extract title & meta description)
    const titleMatch = htmlText.match(/<title>(.*?)<\/title>/i);
    const brandName = titleMatch ? titleMatch[1].split(/[-|]/)[0].trim() : "My Brand";

    // Mock/Extracted Brand Data (You can pass htmlText to OpenAI/Gemini here)
    const scrapedBrandKit = {
      brandName,
      niche: "Software & Technology",
      website: targetUrl,
      primaryColor: "#8b5cf6",
      brandTone: "Professional",
    };

    return NextResponse.json({ success: true, brandKit: scrapedBrandKit });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to scrape website. Please check the URL." },
      { status: 500 }
    );
  }
}