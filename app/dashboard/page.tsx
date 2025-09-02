"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ImageIcon, LogOut } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import EventsPage from "./EventsPage"
import GalleryPage from "./GalleryPage"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"events" | "gallery">("events")

  const router = useRouter()

  const handleLogout = () => {
    // Clear any existing session data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken') // Remove if you're using token-based auth
      sessionStorage.clear()
      document.cookie = 'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
    // Redirect to home page
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-secondary">
              Dashboard Administrativo
            </h1>
            <p className="text-muted-foreground">
              Gerencie eventos e galeria de fotos da associação
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "events"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Próximas Ações
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "gallery"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ImageIcon className="w-4 h-4 inline mr-2" />
            Galeria de Fotos
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total de Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Confira a agenda das próximas ações
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fotos na Galeria</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Veja registros das ações realizadas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Render Active Tab */}
        {activeTab === "events" ? <EventsPage /> : <GalleryPage />}
      </div>

      <Footer />
    </div>
  )
}
