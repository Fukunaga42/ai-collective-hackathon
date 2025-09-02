import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-red-600">Vignette</h1>
            <Badge variant="secondary" className="text-xs">by Creators, for Creators</Badge>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900">Fonctionnalités</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">Tarifs</Link>
            <Link href="#examples" className="text-gray-600 hover:text-gray-900">Exemples</Link>
            <Link href="#about" className="text-gray-600 hover:text-gray-900">À propos</Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">Se connecter</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/app">Start Now</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6">Powered by AI</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Créez des miniatures qui font{" "}
              <span className="text-red-600">exploser vos vues</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              L'IA qui transforme vos idées en miniatures YouTube irrésistibles. 
              Plus de design, plus de clics, plus de revenus.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6">
                <Link href="/app">Commencer gratuitement</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="#demo">Voir la démo</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">+300%</div>
                <div className="text-gray-600">de vues en moyenne</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">10k+</div>
                <div className="text-gray-600">créateurs satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">1M+</div>
                <div className="text-gray-600">miniatures créées</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thumbnail Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">YouTube Thumbnail Example</h2>
          <p className="text-gray-600 mb-12">IA en action</p>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Image
                src="/thumbnail.png"
                alt="YouTube Thumbnail Example"
                width={800}
                height={450}
                className="rounded-lg shadow-2xl mx-auto"
                priority
              />
              <div className="absolute -bottom-6 -right-6 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">CTR moyen</div>
                <div className="text-3xl font-bold">+45%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fonctionnalités</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour dominer YouTube
            </p>
            <p className="text-gray-600 mt-2">
              Une suite complète d'outils alimentés par l'IA pour créer des miniatures qui transforment vos viewers en abonnés fidèles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">IA Intelligente</CardTitle>
                <CardDescription>
                  Notre IA analyse les tendances YouTube pour créer des miniatures qui captent l'attention
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Styles Personnalisés</CardTitle>
                <CardDescription>
                  Choisissez parmi des centaines de styles adaptés à votre niche et votre audience
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Génération Instantanée</CardTitle>
                <CardDescription>
                  Créez des miniatures professionnelles en moins de 30 secondes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">CTR Optimisé</CardTitle>
                <CardDescription>
                  Nos miniatures sont optimisées pour maximiser votre taux de clic
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Gain de Temps</CardTitle>
                <CardDescription>
                  Plus besoin de passer des heures sur Photoshop, créez en quelques clics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Analytics Intégrés</CardTitle>
                <CardDescription>
                  Suivez les performances de vos miniatures et optimisez vos résultats
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à transformer vos miniatures ?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de créateurs qui utilisent déjà notre IA pour dominer YouTube
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link href="/app">Commencer maintenant</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">Vignette</h3>
              <p className="text-gray-400">
                L'IA qui transforme vos idées en miniatures YouTube irrésistibles.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white">Fonctionnalités</Link></li>
                <li><Link href="#pricing" className="hover:text-white">Tarifs</Link></li>
                <li><Link href="#examples" className="hover:text-white">Exemples</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#about" className="hover:text-white">À propos</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/help" className="hover:text-white">Aide</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Compte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/login" className="hover:text-white">Se connecter</Link></li>
                <li><Link href="/register" className="hover:text-white">S'inscrire</Link></li>
                <li><Link href="/app" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Vignette. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}