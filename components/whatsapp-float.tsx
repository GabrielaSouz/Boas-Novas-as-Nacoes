"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(true) // Changed to true to show by default
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Show immediately on component mount
    setIsVisible(true)
    
    // Auto-expand after 3 seconds
    const expandTimer = setTimeout(() => {
      setIsExpanded(true)
    }, 3000)

    return () => {
      clearTimeout(expandTimer)
    }
  }, [])

  const handleWhatsAppClick = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    const message = encodeURIComponent(
      "Olá! Gostaria de saber mais sobre as ações da Associação AD Boas Novas às Nações.",
    )
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  if (!isVisible) return null

  return (
    <>
      {/* WhatsApp Float Button */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
        {/* Expanded Message */}
        {isExpanded && (
          <div className="bg-white dark:bg-card text-foreground p-4 rounded-lg shadow-lg border border-border max-w-xs animate-slide-in-right">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">AD Boas Novas</p>
                  <p className="text-xs text-muted-foreground">Online agora</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpanded}
                className="h-6 w-6 p-0 hover:bg-muted"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Olá! Como podemos ajudar você hoje? Entre em contato conosco pelo WhatsApp.
            </p>
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white text-sm py-2"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Iniciar Conversa
            </Button>
          </div>
        )}

        {/* Main WhatsApp Button */}
        {isVisible && (
          <div className="relative">
            <Button
              onClick={toggleExpanded}
              className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce-in"
              style={{ animationDelay: "0.5s" }}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>

            {/* Pulse Animation */}
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>

            {/* Notification Badge - Only show when not expanded */}
            {!isExpanded && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">1</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Backdrop for mobile */}
      {isExpanded && <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={toggleExpanded} />}
    </>
  )
}
