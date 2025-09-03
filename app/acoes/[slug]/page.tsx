import type { Metadata } from 'next'
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Heart, Users, Calendar, MapPin, Clock } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ActionData {
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  goals: string[];
  howToHelp: string[];
  schedule: string;
  location: string;
  image_url?: string;
  type?: string;
  id?: string;
  date?: string;
  time?: string;
}

const actionsData: Record<string, ActionData> = {
  "varal-solidario": {
    title: "Varal Solidário",
    description: "Doação de roupas e agasalhos para famílias necessitadas",
    fullDescription:
      "O Varal Solidário é uma iniciativa que visa arrecadar e distribuir roupas, calçados e agasalhos para famílias em situação de vulnerabilidade social. Durante os meses mais frios do ano, intensificamos nossa campanha para garantir que ninguém passe frio.",
    image: "/pessoas-doando-roupas-varal-solidario.png",
    goals: [
      "Arrecadar 1000 peças de roupas por mês",
      "Atender 200 famílias mensalmente",
      "Organizar campanhas sazonais de agasalhos",
    ],
    howToHelp: [
      "Doe roupas em bom estado",
      "Participe como voluntário na triagem",
      "Ajude na distribuição às famílias",
      "Divulgue a campanha em suas redes sociais",
    ],
    schedule: "Toda segunda-feira, das 14h às 17h",
    location: "Sede da Associação - Rua das Boas Novas, 123",
  },
  "cortes-cabelo": {
    title: "Cortes de Cabelo",
    description: "Serviços gratuitos de corte de cabelo para a comunidade",
    fullDescription:
      "Oferecemos serviços gratuitos de corte de cabelo para pessoas em situação de vulnerabilidade social, promovendo não apenas o cuidado pessoal, mas também a autoestima e dignidade humana.",
    image: "/barbeiro-cortando-cabelo-voluntario.png",
    goals: ["Atender 100 pessoas por mês", "Capacitar novos voluntários barbeiros", "Expandir para outros bairros"],
    howToHelp: [
      "Seja voluntário se você é barbeiro/cabeleireiro",
      "Doe equipamentos de corte",
      "Ajude na organização dos atendimentos",
      "Indique pessoas que precisam do serviço",
    ],
    schedule: "Primeiro sábado de cada mês, das 9h às 16h",
    location: "Praça Central do bairro",
  },
  "orientacoes-juridicas": {
    title: "Orientações Jurídicas",
    description: "Assessoria jurídica gratuita para questões básicas",
    fullDescription:
      "Disponibilizamos orientação jurídica gratuita para questões básicas do direito civil, trabalhista e previdenciário, ajudando pessoas que não têm condições de contratar um advogado particular.",
    image: "/advogado-orientacao-juridica-gratuita.avif",
    goals: [
      "Atender 50 casos por mês",
      "Resolver 80% das consultas básicas",
      "Encaminhar casos complexos para defensoria",
    ],
    howToHelp: [
      "Seja voluntário se você é advogado",
      "Ajude na triagem de casos",
      "Doe materiais de escritório",
      "Divulgue o serviço para quem precisa",
    ],
    schedule: "Quartas-feiras, das 14h às 18h",
    location: "Sede da Associação - Sala de Atendimento",
  },
  alimentacao: {
    title: "Alimentação",
    description: "Distribuição de alimentos e refeições para famílias carentes",
    fullDescription:
      "Distribuímos cestas básicas e refeições prontas para famílias em situação de insegurança alimentar, garantindo que ninguém passe fome em nossa comunidade.",
    image: "/distribuicao-alimentos-cesta-basica-solidariedade.png",
    goals: [
      "Distribuir 300 cestas básicas mensais",
      "Servir 500 refeições por semana",
      "Atender famílias cadastradas regularmente",
    ],
    howToHelp: [
      "Doe alimentos não perecíveis",
      "Contribua financeiramente",
      "Ajude no preparo das refeições",
      "Participe da distribuição",
    ],
    schedule: "Terças e quintas-feiras, das 11h às 14h",
    location: "Cozinha comunitária da Associação",
  },
  "afericao-pressao": {
    title: "Aferição de Pressão",
    description: "Medimos e registramos pressão arterial para identificar problemas de saúde",
    fullDescription:
      "Oferecemos orientações básicas de saúde, aferição de pressão arterial e encaminhamentos para o sistema público de saúde quando necessário.",
    image: "/enfermeira-medindo-pressao-atendimento-saude.png",
    goals: ["Realizar 200 atendimentos mensais", "Orientar sobre prevenção de doenças", "Encaminhar casos para UBS"],
    howToHelp: [
      "Seja voluntário se você é profissional da saúde",
      "Doe equipamentos para medir a pressão arterial",
      "Ajude na organização dos atendimentos",
      "Participe de campanhas de prevenção",
    ],
    schedule: "Sextas-feiras, das 8h às 12h",
    location: "Sala de atendimento médico da Associação",
  },
  evangelizacao: {
    title: "Evangelização",
    description: "Propagação das Boas Novas através de eventos e visitas",
    fullDescription:
      "Levamos a palavra de Deus através de cultos ao ar livre, visitas domiciliares e eventos evangelísticos, sempre com amor e respeito pela dignidade de cada pessoa.",
    image: "/culto-evangelizacao-ao-ar-livre-comunidade.png",
    goals: ["Realizar 4 eventos evangelísticos por mês", "Visitar 100 famílias mensalmente", "Formar novos discípulos"],
    howToHelp: [
      "Participe dos eventos como voluntário",
      "Ajude na organização dos cultos",
      "Contribua com equipamentos de som",
      "Ore pela obra evangelística",
    ],
    schedule: "Domingos, das 16h às 18h",
    location: "Praças e espaços públicos do bairro",
  },
}

type PageProps = {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const action = actionsData[params.slug as keyof typeof actionsData]

  return {
    title: action?.title || "Ação não encontrada",
    description: action?.description || "",
  }
}

export default function AcaoPage({ params }: PageProps) {
  const action = actionsData[params.slug as keyof typeof actionsData]

  if (!action) {
    notFound()
  }
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Button asChild variant="ghost" className="mb-4">
              <Link href="/#acoes" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar para Ações
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-secondary/10 text-secondary">Ação Social</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{action.title}</h1>
              <p className="text-xl text-muted-foreground mb-6 text-pretty">{action.description}</p>
              <Button asChild size="lg" className="bg-blue-800 hover:bg-blue-800/60 text-white transition-all duration-300">
                <Link href="/contato">
                  <Heart className="mr-2 h-5 w-5" />
                  Quero Ajudar
                </Link>
              </Button>
            </div>

            <div className="relative">
               <Image
                src={action.image || "/placeholder.svg"}
                alt={action.title}
                width={800}
                height={300}
                className="rounded-lg shadow-lg w-full h-[300px] object-cover"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4 text-white">Sobre esta Ação</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{action.fullDescription}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#FCA815]">
                  <Calendar className="h-5 w-5" />
                  Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Horário</p>
                    <p className="text-muted-foreground text-sm">{action.schedule}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Local</p>
                    <p className="text-muted-foreground text-sm">{action.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Goals and How to Help */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className="h-5 w-5" />
                  Nossos Objetivos
                </CardTitle>
                <CardDescription>Metas que buscamos alcançar com esta ação</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {action.goals.map((goal, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#FCA815] rounded-full mt-2"></div>
                      <span className="text-muted-foreground">{goal}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* How to Help */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Heart className="h-5 w-5" />
                  Como Você Pode Ajudar
                </CardTitle>
                <CardDescription>Formas de contribuir com esta ação social</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {action.howToHelp.map((help, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#FCA815] rounded-full mt-2"></div>
                      <span className="text-muted-foreground">{help}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Faça Parte Desta <span className="text-secondary">Transformação</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Sua participação é fundamental para o sucesso desta ação social
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-800/90 text-white text-lg px-8">
              <Link href="/contato">
                <Users className="mr-2 h-5 w-5" />
                Ser Voluntário
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent hover:bg-white hover:text-black">
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
