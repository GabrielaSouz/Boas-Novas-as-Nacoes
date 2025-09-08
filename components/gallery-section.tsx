"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Calendar, X } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { createClient } from "@/lib/supabase/client";
import { useCallback } from "react";

interface GalleryPhoto {
  id?: string;
  title: string;
  description: string;
  image_urls: string[];  // nunca null
  action_type: "varal-solidario" | "cortes-cabelo" | "orientacoes-juridicas" | "alimentacao" | "afericao-pressao";
  date_taken: string;
}

const typeColors = {
  "varal-solidario": "bg-blue-100 text-blue-800 border-blue-200",
  "cortes-cabelo": "bg-green-100 text-green-800 border-green-200",
  "orientacoes-juridicas": "bg-purple-100 text-purple-800 border-purple-200",
  alimentacao: "bg-orange-100 text-orange-800 border-orange-200",
  "afericao-pressao": "bg-red-100 text-red-800 border-red-200",

};

const typeLabels = {
  "varal-solidario": "Varal Solidário",
  "cortes-cabelo": "Cortes de Cabelo",
  "orientacoes-juridicas": "Orientações Jurídicas",
  alimentacao: "Alimentação",
  "afericao-pressao": "Aferição de Pressão",

};

export function GallerySection() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [filter, setFilter] = useState<"all" | "varal-solidario" | "cortes-cabelo" | "orientacoes-juridicas" | "alimentacao" | "afericao-pressao">(
    "all"
  );

  const supabase = createClient();


  const loadPhotos = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery_photos")
      .select("*")
      .order("date_taken", { ascending: false });
  
    if (error) {
      console.error("Erro ao carregar galeria:", error);
    } else {
      setPhotos(
        (data || []).map((photo) => ({
          ...photo,
          image_urls: photo.image_urls ?? [], // <-- garante array
        }))
      );
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const filteredPhotos = photos.filter((photo) => {
    if (filter === "all") return true;
    if (filter === "varal-solidario") return photo.action_type === "varal-solidario";
    if (filter === "cortes-cabelo") return photo.action_type === "cortes-cabelo";
    if (filter === "orientacoes-juridicas") return photo.action_type === "orientacoes-juridicas";
    if (filter === "alimentacao") return photo.action_type === "alimentacao";
    if (filter === "afericao-pressao") return photo.action_type === "afericao-pressao";

    return true;
  });

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              Carregando galeria de fotos...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Galeria das Ações
            </h2>
            <p className="text-muted-foreground text-lg">
              Veja os momentos especiais de nossas ações transformadoras
            </p>
            <div className="w-24 h-1 bg-[#FCA815] mx-auto mt-4"></div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "all"
                ? "bg-blue-800 text-white"
                : "bg-muted text-white hover:bg-muted/80"
                }`}
            >
              Todas as Ações
            </button>
            <button
              onClick={() => setFilter("varal-solidario")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "varal-solidario"
                ? "bg-blue-800 text-white"
                : "bg-muted text-white hover:bg-muted/80"
                }`}
            >
              Varal Solidário
            </button>
            <button
              onClick={() => setFilter("cortes-cabelo")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "cortes-cabelo"
                ? "bg-blue-800 text-white"
                : "bg-muted text-white hover:bg-muted/80"
                }`}
            >
              Cortes de Cabelo
            </button>
            <button
              onClick={() => setFilter("orientacoes-juridicas")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "orientacoes-juridicas"
                ? "bg-blue-800 text-white"
                : "bg-muted text-white hover:bg-muted/80"
                }`}
            >
              Orientação Jurídica
            </button>
            <button
              onClick={() => setFilter("alimentacao")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "alimentacao"
                ? "bg-blue-800 text-white"
                : "bg-muted text-white hover:bg-muted/80"
                }`}
            >
              Alimentação
            </button>
            <button
              onClick={() => setFilter("afericao-pressao")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "afericao-pressao"
                ? "bg-blue-800 text-white"
                : "bg-muted text-white hover:bg-muted/80"
                }`}
            >
              Aferição de Pressão
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <Card
                key={photo.id}
                className="group hover:shadow-xl transition-all duration-500 hover:border-secondary/50 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={photo.image_urls?.[0] || "/placeholder.svg"} // capa = 1ª imagem
                    alt={photo.title}
                    width={1200}
                    height={384}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    priority
                  />

                  <div className="absolute top-3 left-3">
                    <Badge className={typeColors[photo.action_type]}>
                      {typeLabels[photo.action_type]}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-secondary transition-colors">
                    {photo.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {photo.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>
                      {format(parseISO(photo.date_taken), "dd 'de' MMM 'de' yyyy", {
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                Nenhuma foto encontrada
              </h3>
              <p className="text-muted-foreground">
                Não há fotos disponíveis para o filtro selecionado.
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">{selectedPhoto.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {format(parseISO(selectedPhoto.date_taken), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedPhoto(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* várias imagens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {selectedPhoto.image_urls?.map((url, idx) => (
                <Image
                  key={idx}
                  src={url}
                  alt={`${selectedPhoto.title} - ${idx + 1}`}
                  width={1200}
                  height={384}
                  className="w-full h-62 object-cover rounded-lg"
                />
              ))}
            </div>

            <div className="p-4">
              <div className="mb-4">
                <Badge className={typeColors[selectedPhoto.action_type]}>
                  {typeLabels[selectedPhoto.action_type]}
                </Badge>
              </div>
              <p className="text-muted-foreground">{selectedPhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
