"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [message, setMessage] = useState<React.ReactNode>("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    // Verifica se o usuário está autenticado (PKCE já cria sessão temporária)
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user && !error) {
        setSessionReady(true);
      } else {
        setMessage(
          <div>
            O link de redefinição expirou ou você não está logado. <br />
            Solicite um novo link de redefinição de senha.
          </div>
        );
      }
    };
    checkUser();
  }, [supabase]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    setMessage("");

    // Atualiza a senha do usuário logado
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        <div>
          Senha atualizada com sucesso!{" "}
          <Link href="/auth/login" className="text-primary">
            Faça login
          </Link>
        </div>
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Redefinir Senha</h1>
          <p className="text-muted-foreground">
            {sessionReady
              ? "Digite sua nova senha"
              : "Validando seu link de redefinição..."}
          </p>
        </div>

        {sessionReady ? (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <Label htmlFor="password">Nova senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirme a nova senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Atualizando..." : "Redefinir senha"}
            </Button>

            {message && <div className="text-center mt-2">{message}</div>}
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            {message && <div className="mt-4">{message}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
