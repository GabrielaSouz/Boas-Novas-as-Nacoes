
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AgendaSection } from "@/components/agenda-section"
import { GallerySection } from "@/components/gallery-section"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Hero } from "@/components/Hero"
import { History } from "@/components/history"
import OurActions from "@/components/ourActions"


export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* História Section */}
      <History />
      {/* Agenda Section */}
      <ScrollReveal>
        <AgendaSection />
      </ScrollReveal>

      {/* Gallery Section */}
      <ScrollReveal>
        <GallerySection />
      </ScrollReveal>

      {/* Ações Section */}
      <OurActions />
      

      <Footer />
    </div>
  )
}
