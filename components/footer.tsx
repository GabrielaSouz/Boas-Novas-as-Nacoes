"use client"

import Link from "next/link"
import { Mail, Facebook, Instagram, Youtube, Heart, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-card border-t border-border relative">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 group">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/logo_branco.jpg"
                  alt="Logo"
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col p-3">
                <span className="font-bold md:text-xl text-xs group-hover:text-secondary transition-colors">
                  Associação Assembleia de Deus
                </span>
                <span className="font-bold md:text-xl text-xs group-hover:text-secondary transition-colors">
                  Boas Novas as Nações
                </span>
              </div>

            </div>
           
            <p className="text-secondary font-medium text-sm italic">
              Quão formosos são, sobre os montes, os pés do que anuncia as boas novas - Isaías 52:7
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-secondary">Links Rápidos</h3>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-muted-foreground hover:text-secondary transition-all duration-300 hover:translate-x-1"
              >
                Home
              </Link>
              <Link
                href="/acoes"
                className="block text-muted-foreground hover:text-secondary transition-all duration-300 hover:translate-x-1"
              >
                Ações
              </Link>
              <Link
                href="/doacao"
                className="block text-muted-foreground hover:text-secondary transition-all duration-300 hover:translate-x-1"
              >
                Doação
              </Link>
              <Link
                href="/contato"
                className="block text-muted-foreground hover:text-secondary transition-all duration-300 hover:translate-x-1"
              >
                Contato
              </Link>
              <Link
                href="/dashboard"
                className="block text-muted-foreground hover:text-secondary transition-all duration-300 hover:translate-x-1"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Contato e Redes Sociais */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-secondary">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 group">
                <Mail className="h-4 w-4 text-accent group-hover:scale-110 transition-transform duration-300" />
                <span className="text-muted-foreground text-sm group-hover:text-secondary transition-colors">
                boasnovasasnacoesbauru@outlook.com
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Siga-nos:</p>
                <div className="flex space-x-3">
                  <Link
                    href="https://www.facebook.com/Adboasnovasoficiall/"
                    className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                  {/* <Link
                    href="#"
                    className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                  >
                    <Youtube className="h-5 w-5" />
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col items-center gap-4">
          <p className="text-muted-foreground text-sm text-center ">
            © 2024 Associação Assembleia de Deus Boas Novas às Nações. Todos os direitos reservados.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="hover:scale-105 transition-all duration-300 bg-transparent"
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Voltar ao Topo
          </Button>
        </div>
      </div>
    </footer>
  )
}
