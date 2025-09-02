import { ScrollReveal } from "./scroll-reveal";


export function History() {
return(
    <ScrollReveal>
    <section id="historia" className="py-12 sm:py-16 px-4 bg-card">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">Nossa História</h2>
          <div className="w-16 sm:w-24 h-1 bg-[#FCA815] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <ScrollReveal direction="left" delay={200}>
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#FCA815]">Fundação</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Fundado em <strong className="text-white">18/02/2024</strong>, a Associação Assembleia de Deus Boas Novas às
                  Nações nasceu em meio à necessidade de falar do amor de Jesus Cristo, porém com a responsabilidade
                  social às pessoas carentes.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Estamos comprometidos com a{" "}
                  <strong className="text-white">propagação das Boas Novas às Nações</strong>.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#FCA815]">Orientação Pastoral</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Propagação das boas Novas e Evangelização
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={400}>
            <div className="bg-background p-4 sm:p-6 rounded-lg border border-border">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-secondary">Liderança</h3>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-muted-foreground">Presidente:</span>
                  <span className="font-medium">Jionatho A.S</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-muted-foreground">Vice Presidente:</span>
                  <span className="font-medium">Luciana C. S</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-muted-foreground">Conselheiro Geral:</span>
                  <span className="font-medium">Samuel Chequi</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-muted-foreground">Secretaria:</span>
                  <span className="font-medium">Eliana Chequi</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-muted-foreground">Tesoureiro:</span>
                  <span className="font-medium">David C.</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-muted-foreground">Conselheiro Fiscal:</span>
                  <span className="font-medium">José Carlos C.</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={600}>
          <div className="text-center mt-8 sm:mt-12">
            <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-white italic">
             "Quão formosos são, sobre os montes, os pés do que anuncia as boas novas"
            </blockquote>
            <cite className="text-muted-foreground mt-2 block text-sm sm:text-base">Isaías 52:7</cite>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </ScrollReveal>

)
}