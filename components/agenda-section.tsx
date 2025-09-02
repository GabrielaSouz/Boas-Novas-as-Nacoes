"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import { format, parseISO, isAfter, addDays } from "date-fns"
import { ptBR } from "date-fns/locale"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import { Button } from "./ui/button"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type:
  | "varal-solidario"
  | "cortes-cabelo"
  | "orientacoes-juridicas"
  | "alimentacao"
  | "afericao-pressao"
  | "musica"
  | "aula-de-canto"
  | "reforco-pedagogico"
  image_url?: string
}

const typeColors = {
  "varal-solidario": "bg-blue-100 text-blue-800 border-blue-200",
  "cortes-cabelo": "bg-green-100 text-green-800 border-green-200",
  "orientacoes-juridicas": "bg-purple-100 text-purple-800 border-purple-200",
  alimentacao: "bg-orange-100 text-orange-800 border-orange-200",
  "afericao-pressao": "bg-red-100 text-red-800 border-red-200",
  musica: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "aula-de-canto": "bg-green-100 text-green-800 border-green-200",
  "reforco-pedagogico": "bg-blue-100 text-blue-800 border-blue-200",
}

const typeLabels = {
  "varal-solidario": "Varal Solidário",
  "cortes-cabelo": "Cortes de Cabelo",
  "orientacoes-juridicas": "Orientações Jurídicas",
  alimentacao: "Alimentação",
  "afericao-pressao": "Aferição de Pressão",
  musica: "Música",
  "aula-de-canto": "Aula de Canto",
  "reforco-pedagogico": "Reforço Pedagógico",
}

export function AgendaSection() {
  const [filter, setFilter] = useState<string>("all")
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  const loadEvents = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true })

    if (error) {
      console.error("Erro ao carregar eventos:", error)
    } else {
      setEvents(data || [])
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    loadEvents()
  }, [loadEvents])

  const today = new Date()
  const nextWeek = addDays(today, 7)

  // capturar todos os tipos que existem nos eventos
  const availableTypes = Array.from(new Set(events.map((e) => e.type)))

  const filteredEvents = events
    .filter((event) => {
      const eventDate = parseISO(event.date)

      if (filter === "all") {
        return isAfter(eventDate, today)
      } else if (filter === "upcoming") {
        return isAfter(eventDate, today) && eventDate <= nextWeek
      } else {
        return event.type === filter && isAfter(eventDate, today)
      }
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  if (loading) {
    return (
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando próximas ações...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Próximas Ações</h2>
          <p className="text-muted-foreground text-base lg:text-lg">
            Confira nossa agenda de atividades e participe conosco
          </p>
          <div className="w-24 h-1 bg-[#FCA815] mx-auto mt-4"></div>
        </div>

        {/* Botões de filtro dinâmicos */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {/* <button
            onClick={() => setFilter("upcoming")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "upcoming" ? "bg-blue-800 text-white" : "bg-muted text-white hover:bg-muted/80"
              }`}
          >
            Próximos 7 dias
          </button> */}
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "all" ? "bg-blue-800 text-white" : "bg-muted text-white hover:bg-muted/80"
              }`}
          >
            Todos
          </button>

          {/* Geração dinâmica a partir dos tipos existentes */}
          {availableTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${filter === type ? "bg-blue-800 text-white" : "bg-muted text-white hover:bg-muted/80"
                }`}
            >
              {typeLabels[type as keyof typeof typeLabels] ?? type}
            </button>
          ))}
        </div>

        {/* Lista de eventos */}
        <div className="flex flex-col justify-center items-center gap-6">
          {filteredEvents.map((event, index) => (
            <Card
              key={event.id}
              className="group hover:shadow-lg transition-all duration-300 hover:border-secondary/50 animate-fade-in-up w-3/4 bg-white"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Container lado a lado */}
              <div className="flex flex-col md:flex-row md:justify-between gap-4 p-4">

                {/* Texto */}
                <div className="flex-1 flex flex-col justify-between gap-4">
                  <Badge className={typeColors[event.type]}>
                    {typeLabels[event.type]}
                  </Badge>

                  <CardHeader className="p-0">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold text-black group-hover:text-secondary transition-colors">
                        {event.title}
                      </CardTitle>
                      <span className="text-sm bg-black font-semibold text-white px-3 py-1 rounded-md">
                        {format(parseISO(event.date), "dd 'de' MMM", { locale: ptBR })}
                      </span>
                    </div>


                    <CardDescription className="text-sm text-zinc-700 mt-2">
                      {event.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold text-black">
                        <Clock className="h-4 w-4 text-zinc-700 font-semibold" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-black">
                        <MapPin className="h-4 w-4 text-zinc-700 font-semibold" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>

                  <div >
                    <Button className="mt-2 w-full"
                    variant="destructive"
                    >Seja um Voluntário</Button>
                  </div>
                </div>

                {/* Imagem */}
                {event.image_url && (
                  <div className="flex-1">
                    <div className="aspect-video relative rounded-xl overflow-hidden">
                      <Image
                        src={event.image_url}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>


        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">Nenhum evento encontrado</h3>
            <p className="text-muted-foreground">Não há eventos programados para o filtro selecionado.</p>
          </div>
        )}
      </div>
    </section>
  )
}
