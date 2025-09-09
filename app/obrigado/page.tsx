// app/obrigado/page.tsx

import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ObrigadoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Mensagem enviada com sucesso!</h1>
      <p className="text-muted-foreground mb-6">
        Agradecemos pelo contato. Em breve retornaremos.
      </p>
      <Link
        href="/"
        className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
