"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Plus, Edit, Trash2, Save, X } from "lucide-react"
import { format, parseISO, parse } from "date-fns"
import { ptBR } from "date-fns/locale"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import TimePicker from "react-time-picker"
import "react-time-picker/dist/TimePicker.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface Event {
  id?: string
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
  | "momento-comunhao"
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
  "momento-comunhao": "bg-pink-100 text-pink-800 border-pink-200",
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
  "momento-comunhao": "Momento de Comunhão",
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [editingEvent, setEditingEvent] = useState<string | null>(null)
  const [eventFile, setEventFile] = useState<File | null>(null)

  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "varal-solidario",
  })

  const supabase = createClient()

  const loadEvents = useCallback(async () => {
    const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true })
    if (error) {
      console.error("Erro ao carregar eventos:", error)
    } else {
      setEvents(data || [])
    }
  }, [supabase])

  // Function to check the database schema for the events table
  const checkDatabaseSchema = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_enum_values', { enum_name: 'event_type' })
        .single();

      if (error) throw error;
      console.log('Allowed event types from database:', data);
    } catch (schemaError) {
      console.log('Could not fetch enum values, trying information_schema...', schemaError);
      // Fallback to information_schema if the function doesn't exist
      const { data, error: infoError } = await supabase
        .from('information_schema.columns')
        .select('udt_name, column_default')
        .eq('table_name', 'events')
        .eq('column_name', 'type');

      console.log('Column type information:', { data, error: infoError });
    }
  };

  useEffect(() => {
    loadEvents();
    checkDatabaseSchema();
  }, [loadEvents])

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return
    try {
      let imageUrl = ""
      if (eventFile) {
        const fileExt = eventFile.name.split(".").pop()
        const fileName = `${Date.now()}.${fileExt}`
        const filePath = `events/${fileName}`
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, eventFile, { cacheControl: "3600", upsert: false })
        if (uploadError) throw uploadError
        const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(filePath)
        imageUrl = publicUrl
      }

      // Ensure the event type is properly formatted
      const eventToSave = {
        ...newEvent,
        type: newEvent.type as Event["type"], // Ensure type matches the Event type
        image_url: imageUrl
      };

      console.log("Tentando salvar evento:", eventToSave);

      // Log the complete response
      const response = await supabase
        .from("events")
        .insert([eventToSave])
        .select();

      console.log("Resposta completa do Supabase:", response);

      if (response.error) {
        console.error("Erro ao salvar evento:", {
          message: response.error.message,
          details: response.error.details,
          hint: response.error.hint,
          code: response.error.code,
          error: response.error
        });
        return;
      }

      console.log("Evento salvo com sucesso:", response.data);

      await loadEvents()
      setNewEvent({ title: "", description: "", date: "", time: "", location: "", type: "varal-solidario" })
      setEventFile(null)
      setIsAddingEvent(false)
    } catch (error) {
      console.error("Erro ao adicionar evento:", error)
    }
  }

  const handleUpdateEvent = async () => {
    if (editingEvent && newEvent.title && newEvent.date && newEvent.time) {
      try {
        let imageUrl = newEvent.image_url || "" // mantém a imagem antiga por padrão

        // se tiver nova imagem selecionada, faz o upload
        if (eventFile) {
          const fileExt = eventFile.name.split(".").pop()
          const fileName = `${Date.now()}.${fileExt}`
          const filePath = `events/${fileName}`
          const { error: uploadError } = await supabase.storage
            .from("images")
            .upload(filePath, eventFile, { cacheControl: "3600", upsert: false })
          if (uploadError) throw uploadError
          const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(filePath)
          imageUrl = publicUrl
        }

        const eventToUpdate = {
          ...newEvent,
          type: newEvent.type as Event["type"],
          image_url: imageUrl
        };

        const { error } = await supabase
          .from("events")
          .update(eventToUpdate)
          .eq("id", editingEvent)

        if (error) {
          console.error("Erro ao atualizar evento:", error)
          return
        }

        await loadEvents()
        setNewEvent({ title: "", description: "", date: "", time: "", image_url: "", location: "", type: "varal-solidario" })
        setEventFile(null) // limpa a seleção de imagem
        setIsAddingEvent(false)
        setEditingEvent(null)
      } catch (err) {
        console.error("Erro ao atualizar evento:", err)
      }
    }
  }

  const handleDeleteEvent = async (id: string) => {
    await supabase.from("events").delete().eq("id", id)
    await loadEvents()
  }

  const handleEditEvent = (event: Event) => {
    setNewEvent(event)
    setEditingEvent(event.id!)
    setIsAddingEvent(true)
  }

  return (
    <div>
      {/* Botão adicionar */}
      <div className="mb-6">
        <Button onClick={() => setIsAddingEvent(true)} className="bg-primary hover:bg-primary/90" disabled={isAddingEvent}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Evento
        </Button>
      </div>

      {/* Formulário */}
      {isAddingEvent && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingEvent ? "Editar Evento" : "Adicionar Novo Evento"}</CardTitle>
            <CardDescription>Preencha os dados do evento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Título</Label>
                <Input value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
              </div>
              <div>
                <Label>Tipo</Label>
                <Select value={newEvent.type} onValueChange={(value: Event["type"]) => setNewEvent({ ...newEvent, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(typeLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Descrição</Label>
              <Textarea value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Data</Label>
                <DatePicker
                  selected={newEvent.date ? parse(newEvent.date, 'yyyy-MM-dd', new Date()) : null}
                  onChange={(date: Date | null) => {
                    if (date) {
                      const formattedDate = format(date, 'yyyy-MM-dd')
                      setNewEvent({ ...newEvent, date: formattedDate })
                    }
                  }}
                  dateFormat="dd/MM/yyyy"
                  locale={ptBR}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholderText="Selecione uma data"
                />
              </div>
              <div>
                <Label>Horário</Label>
                <TimePicker
                  value={newEvent.time}
                  onChange={(value) => setNewEvent({ ...newEvent, time: value || '' })}
                  format="HH:mm"
                  disableClock
                />
              </div>
              <div>
                <Label>Local</Label>
                <Input value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} />
              </div>
              <div>
                <Label>Imagem</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEventFile(e.target.files?.[0] ?? null)}
                />

                {/* Pré-visualização quando está editando e já existe uma imagem */}
                {editingEvent && newEvent.image_url && !eventFile && (
                  <div className="relative w-full h-40 mt-2">
                    <Image
                      src={newEvent.image_url}
                      alt="Imagem atual"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}

                {/* Pré-visualização da nova imagem selecionada */}
                {eventFile && (
                  <div className="relative w-full h-40 mt-2">
                    <Image
                      src={URL.createObjectURL(eventFile)}
                      alt="Pré-visualização"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={editingEvent ? handleUpdateEvent : handleAddEvent} className="bg-primary hover:bg-primary/90">
                <Save className="mr-2 h-4 w-4" />
                {editingEvent ? "Atualizar" : "Salvar"} Evento
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingEvent(false)
                  setEditingEvent(null)
                  setNewEvent({ title: "", description: "", date: "", time: "", location: "", type: "varal-solidario" })
                }}
              >
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de eventos */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-secondary">Eventos Programados</h2>
        {events.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">Nenhum evento programado</CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <Badge className={typeColors[event.type]}>{typeLabels[event.type]}</Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditEvent(event)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteEvent(event.id!)} className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                  {event.image_url && <Image src={event.image_url} alt={event.title} width={800} height={300} className="w-full h-48 object-cover" />}
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{format(parseISO(event.date), "dd/MM", { locale: ptBR })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
