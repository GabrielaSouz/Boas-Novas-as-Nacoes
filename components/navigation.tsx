"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { usePathname } from "next/navigation";
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/acoes", label: "Ações" },
    { href: "/doacao", label: "Doação" },
    { href: "/contato", label: "Contato" },
  ];
  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-border shadow-lg"
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
               <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src="/logo_branco.jpg"
                              alt="Logo"
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                            />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-sm lg:text-lg group-hover:text-[#F5A618] transition-colors">Associação Assembléia de Deus </span>
              <p className="text-xs text-muted-foreground">Boas Novas as Nações</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-all duration-300 relative group ${
              isActive
                ? "text-[#FCA815] font-semibold" // 🔥 cor diferente na página atual
                : "text-foreground hover:text-[#FCA815]"
            }`}
          >
            {link.label}
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-[#FCA815] transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
        );
      })}
            <Button
              asChild
              className="bg-red-600 hover:bg-red-600/90 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href="/doacao">Doar Agora</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:scale-110 transition-transform duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
        <div className="md:hidden flex flex-col items-center py-4 space-y-4 animate-fade-in-up">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block transition-colors py-2 px-4 rounded-md ${
                  isActive
                    ? "text-[#FCA815] bg-muted/50 font-semibold" // 🔥 ativo
                    : "text-foreground hover:text-[#FCA815] hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Button
            asChild
            className="w-1/4 bg-red-600 hover:bg-red-600/90 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Link href="/doacao" onClick={() => setIsOpen(false)}>
              Doar Agora
            </Link>
          </Button>
        </div>
      )}
      </div>
    </nav>
  )
}
