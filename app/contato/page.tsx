import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Youtube } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "E-mail",
    content: "boasnovasasnacoesbauru@outlook.com",
    description: "Resposta em até 42 horas",
  },
  {
    icon: Phone,
    title: "Telefone",
    content: "(14) 99168-7545",
    description: "Segunda a sexta, 9h às 18h",
  },
  {
    icon: MapPin,
    title: "Endereço",
    content: "Alameda Venus 7-04",
    description: "Parque Sant Edwirgens Bauru SP",
  },
  // {
  //   icon: Clock,
  //   title: "Horário de Funcionamento",
  //   content: "Segunda a Sexta: 9h às 17h",
  //   description: "Sábado: 9h às 12h",
  // },
]

const socialLinks = [
  {
    icon: Facebook,
    name: "Facebook",
    url: "#",
    color: "hover:text-blue-600",
  },
  {
    icon: Instagram,
    name: "Instagram",
    url: "#",
    color: "hover:text-pink-600",
  },
  // {
  //   icon: Youtube,
  //   name: "YouTube",
  //   url: "#",
  //   color: "hover:text-red-600",
  // },
]

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Entre em <span className="text-secondary">Contato</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Estamos aqui para ouvir você. Entre em contato conosco para dúvidas, sugestões ou para se voluntariar
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium mb-2">{info.content}</p>
                    <CardDescription className="text-sm">{info.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-secondary">Envie uma Mensagem</h2>
                <p className="text-muted-foreground">
                  Preencha o formulário abaixo e entraremos em contato o mais breve possível
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5 text-primary" />
                    Formulário de Contato
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome</Label>
                      <Input id="firstName" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input id="lastName" placeholder="Seu sobrenome" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="(11) 99999-9999" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto</Label>
                    <Input id="subject" placeholder="Sobre o que você gostaria de falar?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea id="message" placeholder="Escreva sua mensagem aqui..." rows={6} />
                  </div>

                  <Button className="w-full h-12 text-lg bg-primary hover:bg-primary/90">
                    <Send className="mr-2 h-5 w-5" />
                    Enviar Mensagem
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Volunteer Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-secondary">Seja um Voluntário</CardTitle>
                  <CardDescription>Junte-se à nossa missão de transformar vidas</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Estamos sempre em busca de pessoas dispostas a ajudar em nossas ações sociais. Se você tem tempo
                    disponível e deseja fazer a diferença na vida de pessoas necessitadas, entre em contato conosco.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Áreas de atuação:</strong>
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Distribuição de alimentos</li>
                      <li>Organização de eventos</li>
                     
                      <li>Evangelização</li>
                      
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-secondary">Redes Sociais</CardTitle>
                  <CardDescription>Acompanhe nossas atividades e fique por dentro das novidades</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon
                      return (
                        <a
                          key={index}
                          href={social.url}
                          className={`flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full transition-colors ${social.color}`}
                          aria-label={social.name}
                        >
                          <IconComponent className="h-6 w-6" />
                        </a>
                      )
                    })}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Siga-nos para acompanhar nossos projetos, eventos e histórias de transformação.
                  </p>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-secondary">Nossa Localização</CardTitle>
                  <CardDescription>Venha nos visitar pessoalmente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <p className="font-medium">Alameda Venus 7-04</p>
                        <p className="text-muted-foreground text-sm">Parque Sant Edwirgens</p>
                        <p className="text-muted-foreground text-sm">Bauru -  SP</p>
                      </div>
                    </div>
                    {/* <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-medium">Horário de Atendimento</p>
                        <p className="text-muted-foreground text-sm">Segunda a Sexta: 9h às 17h</p>
                        <p className="text-muted-foreground text-sm">Sábado: 9h às 12h</p>
                      </div>
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
