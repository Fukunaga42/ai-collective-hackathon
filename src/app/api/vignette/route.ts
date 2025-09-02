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

async function generateHooks(transcript: string) {
  try {
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      throw new Error('MISTRAL_API_KEY not configured');
    }

    const prompt = `You are a YouTube content strategist. Based on the transcript, create 3 unique, catchy hook suggestions (1–5 words each) for the start of the video.  

CRITICAL RULES:  
- Hooks must be between 1 and 5 words. MAXIMUM 5 WORDS PER HOOK.
- Count words carefully: "1 jeune sur 4" = 4 words, "est dépressif" = 2 words
- Make them bold, curiosity-driven, or emotionally engaging.  
- Use a natural, conversational YouTube style.  
- Each hook should use a different style (e.g., shocking fact, bold claim, relatable question).  
- Do not summarize; make viewers curious to watch.  

Return ONLY valid JSON in this format:  
{
  "hooks": [
    {"hook_1": "First hook"},
    {"hook_2": "Second hook"},
    {"hook_3": "Third hook"}
  ]
}

Transcript: ${transcript}`;

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`Mistral API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content returned from Mistral API');
    }

    // Clean up markdown formatting and parse the JSON response
    const cleanedContent = content.replace(/\*\*/g, '');
    const hooksData = JSON.parse(cleanedContent);
    
    // Post-process to ensure hooks are 1-5 words
    const processedHooks = hooksData.hooks.map((hook: any) => {
      const key = Object.keys(hook)[0];
      let value = hook[key];
      const words = value.split(' ');
      
      if (words.length > 5) {
        // Truncate to 5 words if too long
        value = words.slice(0, 5).join(' ');
      }
      
      return { [key]: value };
    });
    
    return { hooks: processedHooks };

  } catch (error) {
    console.error('Error generating hooks:', error);
    // Fallback to mock if real API fails
    await sleep(200);
    return { 
      hooks: [
        { hook_1: "You won't believe this!" },
        { hook_2: "This changes everything!" },
        { hook_3: "The truth will shock you!" }
      ]
    };
  }
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

    const { hooks } = await generateHooks(transcript);

    // Persist to DB (mock URLs)
    await connectToDatabase();
    const doc = await Vignette.create({
      logoUrl: logoSaved.url,
      faceUrl: headshotSaved.url,
      transcript,
      hookProposal: hooks,
      selectedHook: null,
      imageVignette: null,
    });

    return NextResponse.json({
      ok: true,
      id: String(doc._id),
      videoUrl,
      transcript,
      hooks,
      headshot: headshotSaved,
      logo: logoSaved,
    });
  } catch (err) {
    console.error("/api/vignette error", err);
    return NextResponse.json({ ok: false, error: "Internal error (mock)" }, { status: 500 });
  }
}
