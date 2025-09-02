import { ParallaxSection } from "@/components/parallax-section"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart } from "lucide-react"

export function Hero() {
  return (
    <section className="relative bg-[url('/hero-desktop.png')] bg-cover bg-no-repeat bg-center min-h-[80vh] flex items-center px-4 text-center overflow-hidden">
       <div className="absolute inset-0 bg-black/40"></div>
      <ParallaxSection speed={0.3}>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
      </ParallaxSection>

      <div className="container mx-auto max-w-4xl relative z-10">
        <ScrollReveal direction="fade" delay={200}>
          <div className="mb-6 sm:mb-8">
          {/* <div className="relative w-42 h-42 sm:w-38 sm:h-38 mx-auto ">
              <Image
                src="/logo.png"
                alt="Logo Associação AD Boas Novas às Nações"
                fill
                className="object-contain "
                priority
              />
            </div> */}
            <h1 className="mt-12 text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-balance leading-tight">
              Associação Assembleia de Deus
              <span className="block text-4xl lg:text-6xl mt-2">
                Boas Novas às Nações
              </span>
              
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 text-pretty max-w-3xl mx-auto px-4">
              Propagando o amor de Jesus Cristo com responsabilidade social às
              pessoas carentes
            </p>
            
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={400}>
          <div className="flex flex-row items-center justify-center gap-6 mx-auto">
            <Button
              asChild
              size="lg"
              className="bg-[#FCA815] hover:bg-[#FCA815]/90  text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href="/doacao">
                <Heart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Fazer Doação
              </Link>
            </Button>
            
            <Button
              asChild
             
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4  hover:scale-105 transition-all duration-300"
            >
              <Link href="#historia">Conheça Nossa História</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
