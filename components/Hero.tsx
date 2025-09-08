import { ParallaxSection } from "@/components/parallax-section"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center px-4 overflow-hidden bg-[url('/hero-bg.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/40"></div>
      <ParallaxSection speed={0.3}>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
      </ParallaxSection>

      <div className="container mx-auto max-w-6xl relative z-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texto → Esquerda em telas grandes */}
          <ScrollReveal direction="fade" delay={200} className="order-2 md:order-1">
            <div className="text-center md:text-left space-y-6">
              <h1 className="text-2xl lg:text-3xl font-bold leading-tight text-white">
                Associação Assembleia de Deus
                <span className="block text-3xl lg:text-5xl mt-2 text-white">
                  Boas Novas às Nações
                </span>
              </h1>
              <p className="text-lg text-white/90 max-w-xl mx-auto md:mx-0">
                Transformando vidas através do amor de Jesus Cristo
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#FCA815] hover:bg-[#FCA815]/90 text-base sm:text-lg px-6 sm:px-8 py-3 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Link href="/doacao">
                    <Heart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Fazer Doação
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-black bg-white hover:bg-white/50 text-base sm:text-lg px-6 sm:px-8 py-3 hover:scale-105 transition-all duration-300"
                >
                  <Link href="#agenda-section">Próximas Ações</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Imagem → Direita em telas grandes */}
          <ScrollReveal direction="fade" delay={400} className="order-1 md:order-2">
            <div className="relative w-full aspect-square max-w-xl mx-auto">
              <Image
                src="/logo.png"
                alt="Logo Associação AD Boas Novas às Nações"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 90vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
