"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StepTwoPage() {
  const router = useRouter();
  const [headshot, setHeadshot] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [hook, setHook] = useState<string | null>(null);

  useEffect(() => {
    const h = sessionStorage.getItem("vignette.headshot");
    const l = sessionStorage.getItem("vignette.logo");
    const v = sessionStorage.getItem("vignette.videoUrl");
    const hk = sessionStorage.getItem("vignette.hook");
    if (!h || !l || !v) {
      router.replace("/app");
      return;
    }
    setHeadshot(h);
    setLogo(l);
    setVideoUrl(v);
    if (hk) setHook(hk);
  }, [router]);

  function onBack() {
    router.push("/app");
  }

  function onGenerate() {
    // Placeholder for actual generation logic
    console.log("Generate vignette with:", { headshot, logo, videoUrl });
    alert("Generation started (stub). Wire this to your backend next.");
  }

  if (!headshot || !logo || !videoUrl) return null;

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>YouTube Vignette - Step 2</CardTitle>
          <CardDescription>Review your inputs before generation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {hook && (
            <div className="rounded-md border p-4 bg-secondary/30">
              <div className="text-sm font-medium mb-1">Suggested Hook (mock)</div>
              <p className="text-sm leading-relaxed">{hook}</p>
            </div>
          )}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <div className="text-sm font-medium mb-2">Head photo</div>
              <div className="relative h-40 w-full overflow-hidden rounded-md border">
                <Image src={headshot} alt="Headshot" fill className="object-cover" />
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-2">Logo</div>
              <div className="relative h-40 w-full overflow-hidden rounded-md border bg-secondary">
                <Image src={logo} alt="Logo" fill className="object-contain" />
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Video link</div>
            <a
              href={videoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline break-all"
            >
              {videoUrl}
            </a>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="secondary" onClick={onBack}>
            Back to edit
          </Button>
          <Button onClick={onGenerate}>Generate Vignette</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
