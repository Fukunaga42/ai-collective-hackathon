"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AppPage() {
  const router = useRouter();
  const [headshotFile, setHeadshotFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const headshotPreview = useObjectUrl(headshotFile);
  const logoPreview = useObjectUrl(logoFile);

  const isValid = useMemo(() => {
    const hasImages = !!headshotFile && !!logoFile;
    const hasUrl = !!videoUrl && isProbablyUrl(videoUrl);
    return hasImages && hasUrl;
  }, [headshotFile, logoFile, videoUrl]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || !headshotFile || !logoFile) return;
    setSubmitting(true);
    setError(null);
    try {
      // Prepare multipart form data to send files to backend
      const form = new FormData();
      form.append("headshot", headshotFile);
      form.append("logo", logoFile);
      form.append("videoUrl", videoUrl);

      const res = await fetch("/api/vignette", {
        method: "POST",
        body: form,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Request failed (${res.status})`);
      }
      const data = await res.json();

      // Also convert images to data URLs for preview on step 2
      const [headshotDataUrl, logoDataUrl] = await Promise.all([
        fileToDataURL(headshotFile),
        fileToDataURL(logoFile),
      ]);

      sessionStorage.setItem("vignette.headshot", headshotDataUrl);
      sessionStorage.setItem("vignette.logo", logoDataUrl);
      sessionStorage.setItem("vignette.videoUrl", videoUrl);
      if (data?.hook) sessionStorage.setItem("vignette.hook", String(data.hook));

      router.push("/app/step-2");
    } catch (err: any) {
      setError(err?.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>YouTube Vignette - Step 1</CardTitle>
          <CardDescription>Provide your assets to prepare the vignette.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="headshot">Head photo</Label>
                <Input
                  id="headshot"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setHeadshotFile(e.target.files?.[0] ?? null)}
                />
                {headshotPreview && (
                  <div className="relative mt-2 h-40 w-full overflow-hidden rounded-md border" aria-label="Headshot preview">
                    <Image src={headshotPreview} alt="Headshot preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
                />
                {logoPreview && (
                  <div className="relative mt-2 h-40 w-full overflow-hidden rounded-md border" aria-label="Logo preview">
                    <Image src={logoPreview} alt="Logo preview" fill className="object-contain bg-secondary" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video link (YouTube URL)</Label>
              <Input
                id="videoUrl"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <CardFooter className="flex justify-end px-0">
              <Button type="submit" disabled={!isValid || submitting}>
                Continue to Step 2
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

function isProbablyUrl(value: string) {
  try {
    const u = new URL(value);
    return !!u.protocol && !!u.host;
  } catch (e) {
    return false;
  }
}

function useObjectUrl(file: File | null) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return url;
}

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
