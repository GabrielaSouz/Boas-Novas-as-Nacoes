import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Heart,
  Users,
  Scale,
  Utensils,
  Stethoscope,
  BookOpen,
  Scissors,
  ArrowRight,
  Calendar,
  MapPin,
} from "lucide-react"

const actions = [
  {
    title: "Varal Solidário",
    description: "Doação de roupas e agasalhos para famílias necessitadas",
    icon: Heart,
    slug: "varal-solidario",
    details:
      "Arrecadamos e distribuímos roupas, calçados e agasalhos para pessoas em situação de vulnerabilidade social.",
    frequency: "Verifique na agenda disponibilidade",
    location: "Sede da Associação",
  },
  {
    title: "Cortes de Cabelo",
    description: "Serviços gratuitos de corte de cabelo para a comunidade",
    icon: Scissors,
    slug: "cortes-cabelo",
    details:
      "Oferecemos serviços gratuitos de corte de cabelo com profissionais voluntários para a comunidade carente.",
      frequency: "Verifique na agenda disponibilidade",
    location: "Praça Central",
  },
  {
    title: "Orientações Jurídicas",
    description: "Assessoria jurídica gratuita para questões básicas",
    icon: Scale,
    slug: "orientacoes-juridicas",
    details:
      "Advogados voluntários oferecem orientação jurídica gratuita em questões trabalhistas, previdenciárias e familiares.",
      frequency: "Verifique na agenda disponibilidade",
    location: "Sede da Associação",
  },
  {
    title: "Alimentação",
    description: "Distribuição de alimentos e refeições para famílias carentes",
    icon: Utensils,
    slug: "alimentacao",
    details: "Distribuímos cestas básicas e refeições prontas para famílias em situação de insegurança alimentar.",
    frequency: "Verifique na agenda disponibilidade",
    location: "Múltiplos pontos da cidade",
  },
  {
    title: "Aferição de Pressão",
    description: "Medimos e registramos pressão arterial para identificar problemas de saúde",
    icon: Stethoscope,
    slug: "afericao-pressao",
  details: "Profissionais da saúde voluntários oferecem mediçao da pressão arterial e orientações sobre cuidados preventivos.",
  frequency: "Verifique na agenda disponibilidade",
    location: "Centro Comunitário",
  },
  {
    title: "Evangelização",
    description: "Propagação das Boas Novas através de eventos e visitas",
    icon: BookOpen,
    slug: "evangelizacao",
    details:
      "Realizamos cultos ao ar livre, visitas domiciliares e eventos evangelísticos para compartilhar o amor de Cristo.",
      frequency: "Verifique na agenda disponibilidade",
    location: "Diversos bairros",
  },
]

export default function AcoesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 px-4 text-center bg-gradient-to-b from-card to-background">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Nossas <span className="text-secondary">Ações Sociais</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Conheça todas as iniciativas que transformam vidas em nossa comunidade
            </p>
            <div className="w-24 h-1 bg-[#FCA815] mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Actions Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <Card
                  key={action.slug}
                  className="group hover:shadow-xl transition-all duration-500 hover:border-secondary/50 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                      <IconComponent className="h-10 w-10 text-[#FCA815]" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-white transition-colors">
                      {action.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {action.details}
                    </CardDescription>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{action.frequency}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{action.location}</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        asChild
                        variant="default"
                        className="w-full bg-white text-black hover:bg-red-600 hover:text-white transition-all duration-300 "
                      >
                        <Link href={`/acoes/${action.slug}`}>
                          <span className="mr-2">Saiba mais</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quer Participar de Nossas <span className="text-secondary">Ações?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Seja um voluntário e ajude-nos a transformar vidas através do amor de Cristo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
              <Link href="/contato">
                <Users className="mr-2 h-5 w-5" />
                Seja Voluntário
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Link href="/doacao">
                <Heart className="mr-2 h-5 w-5" />
                Fazer Doação
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
