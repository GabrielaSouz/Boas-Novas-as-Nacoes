import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, CreditCard, Smartphone, Building, Users, Utensils, GraduationCap } from "lucide-react"

const impactCards = [
  {
    icon: Utensils,
    title: "R$ 50",
    description: "Alimenta uma pessoa por uma semana",
    color: "text-[#FCA815]",
  },
  {
    icon: Users,
    title: "R$ 100",
    description: "Apoia 2 pessoas com roupas e agasalhos",
    color: "text-[#FCA815]",
  },
  {
    icon: GraduationCap,
    title: "R$ 200",
    description: "Financia orientação jurídica para 1 famílias",
    color: "text-[#FCA815]",
  },
]

export default function DoacaoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Faça uma <span className="text-secondary">Doação</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Sua generosidade transforma vidas e espalha o amor de Cristo às pessoas necessitadas
          </p>
        </div>
      </section>

      {/* Impact Cards */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">Veja o Impacto da Sua Doação</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactCards.map((card, index) => {
              const IconComponent = card.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className={`h-6 w-6 ${card.color}`} />
                    </div>
                    <CardTitle className={`text-2xl ${card.color}`}>{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{card.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Informações Bancárias */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-secondary">Realize Sua Doação</h2>
            <p className="text-muted-foreground">Você pode fazer sua doação através de transferência bancária</p>
          </div>

          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Dados Bancários</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Banco:</span>
                <span className="font-medium">Banco do Brasil</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Agência:</span>
                <span className="font-medium">0001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Conta:</span>
                <span className="font-medium">5513932-5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CORA SCD:</span>
                <span className="font-medium">403</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CNPJ:</span>
                <span className="font-medium">58.754.836/0001-61</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Favorecido:</span>
                <span className="font-medium text-sm">Associação AD Boas Novas às Nações</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
