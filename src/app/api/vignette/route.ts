import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Vignette from "@/models/Vignette";
import console from "console";

// Mock helpers simulating external services
async function transcribe(videoUrl: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/transcript?url=${encodeURIComponent(videoUrl)}`);
    
    if (!response.ok) {
      throw new Error(`Transcript API error: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      transcript: data.transcript || data.text || JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching transcript:', error);
    // Fallback to mock if real API fails
    await sleep(200);
    return {
      transcript: `Mock transcript for ${videoUrl} (API unavailable)`,
    };
  }

  
}

async function mockMistralHook(transcript: string) {
  // pretend to call Mistral to generate a hook based on transcript
  console.log('Generating hook for transcript:', transcript);
  await sleep(200);
  const hook = `Hook: ${transcript.slice(0, 40)}... You won't believe the twist!`;
  return { hook };
}

async function mockSaveImage(file?: File | null) {
  if (!file) return { id: null, url: null };
  // pretend to persist and return an ID/URL
  await sleep(100);
  const id = Math.random().toString(36).slice(2, 10);
  return { id, url: `mock://image/${id}` };
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const videoUrl = String(form.get("videoUrl") || "");
    const headshot = form.get("headshot") as File | null;
    const logo = form.get("logo") as File | null;

    if (!videoUrl || !headshot || !logo) {
      return NextResponse.json(
        { error: "Missing required fields: headshot, logo, videoUrl" },
        { status: 400 }
      );
    }

    const [{ transcript }, headshotSaved, logoSaved] = await Promise.all([
      transcribe(videoUrl),
      mockSaveImage(headshot),
      mockSaveImage(logo),
    ]);

    const { hook } = await mockMistralHook(transcript);

    // Persist to DB (mock URLs)
    await connectToDatabase();
    const doc = await Vignette.create({
      logoUrl: logoSaved.url,
      faceUrl: headshotSaved.url,
      transcript,
      hookProposal: hook,
      selectedHook: null,
      imageVignette: null,
    });

    return NextResponse.json({
      ok: true,
      id: String(doc._id),
      videoUrl,
      transcript,
      hook,
      headshot: headshotSaved,
      logo: logoSaved,
    });
  } catch (err) {
    console.error("/api/vignette error", err);
    return NextResponse.json({ ok: false, error: "Internal error (mock)" }, { status: 500 });
  }
}
