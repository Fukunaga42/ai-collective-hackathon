import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function AppPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-red-600">
            Vignette
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/">Retour à l'accueil</Link>
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Se déconnecter
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Créez votre miniature YouTube
            </h1>
            <p className="text-xl text-gray-600">
              L'IA génère automatiquement des miniatures optimisées pour votre contenu
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle>Informations de votre vidéo</CardTitle>
                <CardDescription>
                  Remplissez les informations ci-dessous pour générer votre miniature
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="video-url">URL de la vidéo YouTube</Label>
                  <Input
                    id="video-url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    type="url"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="video-title">Titre de la vidéo</Label>
                  <Input
                    id="video-title"
                    placeholder="Mon super titre de vidéo"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="video-description">Description (optionnel)</Label>
                  <textarea
                    id="video-description"
                    className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Décrivez votre vidéo..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="style">Style de miniature</Label>
                  <select
                    id="style"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="modern">Moderne</option>
                    <option value="vintage">Vintage</option>
                    <option value="minimalist">Minimaliste</option>
                    <option value="bold">Audacieux</option>
                    <option value="elegant">Élégant</option>
                  </select>
                </div>
                
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Générer ma miniature
                </Button>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Aperçu de votre miniature</CardTitle>
                <CardDescription>
                  Voici un exemple de ce que notre IA peut créer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🎨</div>
                    <p>Votre miniature apparaîtra ici</p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">CTR estimé</span>
                    <span className="font-semibold text-green-600">+45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Style</span>
                    <span className="font-semibold">Moderne</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Temps de génération</span>
                    <span className="font-semibold">~30s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">
              Pourquoi choisir Vignette ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl mb-2">⚡</div>
                    <h3 className="font-semibold mb-2">Génération rapide</h3>
                    <p className="text-sm text-gray-600">
                      Créez des miniatures en moins de 30 secondes
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎯</div>
                    <h3 className="font-semibold mb-2">CTR optimisé</h3>
                    <p className="text-sm text-gray-600">
                      Maximisez votre taux de clic avec l'IA
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎨</div>
                    <h3 className="font-semibold mb-2">Styles variés</h3>
                    <p className="text-sm text-gray-600">
                      Des centaines de styles pour tous les créateurs
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}