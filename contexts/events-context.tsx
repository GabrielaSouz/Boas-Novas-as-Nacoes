"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

// interface Event compatível com AgendaSection
export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  // whatsapp?: string 
  type:
    | "varal-solidario"
    | "cortes-cabelo"
    | "orientacoes-juridicas"
    | "alimentacao"
    | "afericao-pressao"
    | "musica"
    | "aula-de-canto"
    | "reforco-pedagogico"
    | "momento-comunhao"
  participants?: number // opcional (caso venha do Supabase)
  image_url?: string
}

interface EventsContextType {
  events: Event[]
  loading: boolean
  addEvent: (event: Omit<Event, "id">) => Promise<void>
  updateEvent: (id: string, event: Omit<Event, "id">) => Promise<void>
  deleteEvent: (id: string) => Promise<void>
  reloadEvents: () => Promise<void>
}

const EventsContext = createContext<EventsContextType | undefined>(undefined)

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  // carregar eventos do Supabase
  const loadEvents = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true })
    if (error) {
      console.error("Erro ao carregar eventos:", error)
    } else {
      setEvents(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    loadEvents()
  }, [])

  // CRUD integrado com Supabase
  const addEvent = async (eventData: Omit<Event, "id">) => {
    const { data, error } = await supabase.from("events").insert(eventData).select().single()
    if (error) {
      console.error("Erro ao adicionar evento:", error)
      return
    }
    setEvents((prev) => [...prev, data])
  }

  const updateEvent = async (id: string, eventData: Omit<Event, "id">) => {
    const { data, error } = await supabase.from("events").update(eventData).eq("id", id).select().single()
    if (error) {
      console.error("Erro ao atualizar evento:", error)
      return
    }
    setEvents((prev) => prev.map((event) => (event.id === id ? data : event)))
  }

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id)
    if (error) {
      console.error("Erro ao deletar evento:", error)
      return
    }
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }

  return (
    <EventsContext.Provider value={{ events, loading, addEvent, updateEvent, deleteEvent, reloadEvents: loadEvents }}>
      {children}
    </EventsContext.Provider>
  )
}

export function useEvents() {
  const context = useContext(EventsContext)
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider")
  }
  return context
}
