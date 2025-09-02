"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Trash2, Save, X, Plus, ImageIcon } from "lucide-react"
import { format, parseISO, parse } from "date-fns"
import { ptBR } from "date-fns/locale"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


interface GalleryPhoto {
  id?: string
  title: string
  description: string
  image_url: string
  action_type:
    | "varal-solidario"
    | "cortes-cabelo"
    | "orientacoes-juridicas"
    | "alimentacao"
    | "afericao-pressao"

  date_taken: string
}

const typeColors = {
  "varal-solidario": "bg-blue-100 text-blue-800 border-blue-200",
  "cortes-cabelo": "bg-green-100 text-green-800 border-green-200",
  "orientacoes-juridicas": "bg-purple-100 text-purple-800 border-purple-200",
  alimentacao: "bg-orange-100 text-orange-800 border-orange-200",
  "afericao-pressao": "bg-red-100 text-red-800 border-red-200",

}

const typeLabels = {
  "varal-solidario": "Varal Solidário",
  "cortes-cabelo": "Cortes de Cabelo",
  "orientacoes-juridicas": "Orientações Jurídicas",
  alimentacao: "Alimentação",
  "afericao-pressao": "Aferição de Pressão",

}

export default function GalleryPage() {
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([])
  const [isAddingPhoto, setIsAddingPhoto] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState<string | null>(null)
  const [eventFile, setEventFile] = useState<File | null>(null)
  const [newPhoto, setNewPhoto] = useState<GalleryPhoto>({
    title: "",
    description: "",
    image_url: "",
    action_type: "varal-solidario",
    date_taken: "",
  })

  const supabase = createClient()

  const loadGalleryPhotos = async () => {
    const { data, error } = await supabase
      .from("gallery_photos")
      .select("*")
      .order("date_taken", { ascending: false })

    if (error) console.error("Erro ao carregar galeria:", error)
    else setGalleryPhotos(data || [])
  }

  useEffect(() => {
    loadGalleryPhotos()
  }, [])


    const handleAddPhoto = async () => {
      if (!newPhoto.title || !newPhoto.date_taken) return
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
        await supabase.from("gallery_photos").insert([{ ...newPhoto, image_url: imageUrl }])
        await loadGalleryPhotos()
        setNewPhoto({ title: "", description: "", image_url: "", action_type: "varal-solidario", date_taken: "" })
        setEventFile(null)
        setIsAddingPhoto(false)
      } catch (error) {
        console.error("Erro ao adicionar evento:", error)
      }
    }

  const handleUpdatePhoto = async () => {
    if (editingPhoto && newPhoto.title && newPhoto.image_url && newPhoto.date_taken) {
      const { error } = await supabase.from("gallery_photos").update(newPhoto).eq("id", editingPhoto)
      if (error) console.error("Erro ao atualizar foto:", error)
      else {
        await loadGalleryPhotos()
        setNewPhoto({ title: "", description: "", image_url: "", action_type: "varal-solidario", date_taken: "" })
        setIsAddingPhoto(false)
        setEditingPhoto(null)
      }
    }
  }

  const handleDeletePhoto = async (id: string) => {
    const { error } = await supabase.from("gallery_photos").delete().eq("id", id)
    if (error) console.error("Erro ao deletar foto:", error)
    else await loadGalleryPhotos()
  }

  const handleEditPhoto = (photo: GalleryPhoto) => {
    setNewPhoto(photo)
    setEditingPhoto(photo.id!)
    setIsAddingPhoto(true)
  }

  return (
    <div>
      {/* Add Photo Button */}
      <div className="mb-6">
        <Button onClick={() => setIsAddingPhoto(true)} className="bg-primary hover:bg-primary/90" disabled={isAddingPhoto}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Foto
        </Button>
      </div>

      {/* Add/Edit Form */}
      {isAddingPhoto && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingPhoto ? "Editar Foto" : "Adicionar Nova Foto"}</CardTitle>
            <CardDescription>Adicione fotos das ações realizadas à galeria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="photo-title">Título da Foto</Label>
                <Input
                  id="photo-title"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="action-type">Tipo de Ação</Label>
                <Select value={newPhoto.action_type} onValueChange={(value: GalleryPhoto["action_type"]) => setNewPhoto({ ...newPhoto, action_type: value })}>
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

            <div className="space-y-2">
              <Label htmlFor="photo-description">Descrição</Label>
              <Textarea
                id="photo-description"
                value={newPhoto.description}
                onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label>Imagem</Label>
                <Input type="file" accept="image/*" onChange={(e) => setEventFile(e.target.files?.[0] ?? null)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-taken">Data da Ação</Label>
                              <DatePicker
                                selected={newPhoto.date_taken ? parse(newPhoto.date_taken, 'yyyy-MM-dd', new Date()) : null}
                                onChange={(date: Date | null) => {
                                  if (date) {
                                    const formattedDate = format(date, 'yyyy-MM-dd')
                                    setNewPhoto({ ...newPhoto, date_taken: formattedDate })
                                  }
                                }}
                                dateFormat="dd/MM/yyyy"
                                locale={ptBR}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholderText="Selecione uma data"
                              />
                            </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={editingPhoto ? handleUpdatePhoto : handleAddPhoto} className="bg-primary hover:bg-primary/90">
                <Save className="mr-2 h-4 w-4" />
                {editingPhoto ? "Atualizar" : "Salvar"} Foto
              </Button>
              <Button variant="outline" onClick={() => { setIsAddingPhoto(false); setEditingPhoto(null); }}>
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gallery List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {galleryPhotos.map((photo) => (
    <Card
      key={photo.id}
      className="hover:shadow-lg transition-shadow overflow-hidden"
    >
      {/* Container fixo */}
      <div className="relative w-full h-48 md:h-60 lg:h-72">
        <Image
          src={photo.image_url || "/placeholder.svg"}
          alt={photo.title}
          fill
          className="object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleEditPhoto(photo)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleDeletePhoto(photo.id!)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardHeader>
        <Badge className={typeColors[photo.action_type]}>
          {typeLabels[photo.action_type]}
        </Badge>
        <CardTitle className="text-lg">{photo.title}</CardTitle>
        <CardDescription>{photo.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          <span>
            {format(parseISO(photo.date_taken), "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  ))}
</div>
    </div>
  )
}
