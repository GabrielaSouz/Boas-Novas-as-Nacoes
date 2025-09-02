import Link from "next/link"

import {  ArrowRight } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card"
import { Heart, Scale, Utensils, Stethoscope, BookOpen, Scissors } from "lucide-react"

const actions = [
    {
      title: "Varal Solidário",
      description: "Doação de roupas e agasalhos para famílias necessitadas",
      icon: Heart,
      slug: "varal-solidario",
    },
    {
      title: "Cortes de Cabelo",
      description: "Serviços gratuitos de corte de cabelo para a comunidade",
      icon: Scissors,
      slug: "cortes-cabelo",
    },
    {
      title: "Orientações Jurídicas",
      description: "Assessoria jurídica gratuita para questões básicas",
      icon: Scale,
      slug: "orientacoes-juridicas",
    },
    {
      title: "Alimentação",
      description: "Distribuição de alimentos e refeições para famílias carentes",
      icon: Utensils,
      slug: "alimentacao",
    },
    {
      title: "Aferição de Pressão",
      description: "Medimos e registramos pressão arterial para identificar problemas de saúde",
      icon: Stethoscope,
      slug: "afericao-pressao",
    },
    {
      title: "Evangelização",
      description: "Propagação das Boas Novas através de eventos e visitas",
      icon: BookOpen,
      slug: "evangelizacao",
    },
  ]

export default function OurActions() {
    
    return(
        <ScrollReveal>
        <section className="py-12 sm:py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">Nossas Ações Sociais</h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                Conheça as iniciativas que transformam vidas em nossa comunidade
              </p>
              <div className="w-16 sm:w-24 h-1 bg-[#FCA815] mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {actions.map((action, index) => {
                const IconComponent = action.icon
                return (
                  <ScrollReveal key={action.slug} delay={index * 100}>
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-secondary/50 cursor-pointer hover:-translate-y-1 h-full">
                      <Link href="/acoes" className="block h-full">
                        <CardHeader className="text-center pb-3 sm:pb-4">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                            <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-[#FCA815]" />
                          </div>
                          <CardTitle className="text-lg sm:text-xl group-hover:text-secondary transition-colors">
                            {action.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <CardDescription className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                            {action.description}
                          </CardDescription>
                          <div className="flex items-center justify-center mt-3 sm:mt-4 text-white group-hover:text-secondary transition-colors">
                            <span className="text-xs sm:text-sm font-medium mr-2">Saiba mais</span>
                            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  </ScrollReveal>
                )
              })}
            </div>

            <ScrollReveal delay={600}>
              <div className="text-center mt-8 sm:mt-12">
                <Button
                  asChild
                  variant="default"
                  size="lg"
                  className="text-base sm:text-lg px-6 sm:px-8 hover:scale-105 transition-transform bg-white hover:bg-red-600 hover:text-white"
                >
                  <Link href="/acoes">
                    Ver Todas as Ações
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>
    )
}