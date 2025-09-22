"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";

// Componente de alerta local temporário
const Alert = ({ variant = 'default', className = '', children }: { variant?: 'default' | 'destructive', className?: string, children: React.ReactNode }) => (
  <div className={`p-4 rounded-md mb-4 ${variant === 'destructive'
      ? 'bg-red-50 text-red-700 border border-red-200'
      : 'bg-blue-50 text-blue-700 border border-blue-200'
    } ${className}`}>
    {children}
  </div>
);

const AlertTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-medium mb-1">{children}</h3>
);

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm">{children}</div>
);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [sessionReady, setSessionReady] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [passwordError, setPasswordError] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Função para validar a força da senha
  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) {
      return "A senha deve ter pelo menos 8 caracteres";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "A senha deve conter pelo menos uma letra maiúscula";
    }
    if (!/[a-z]/.test(pwd)) {
      return "A senha deve conter pelo menos uma letra minúscula";
    }
    if (!/[0-9]/.test(pwd)) {
      return "A senha deve conter pelo menos um número";
    }
    return "";
  };

  // Efeito para validar a senha em tempo real
  useEffect(() => {
    if (password) {
      setPasswordError(validatePassword(password));
    } else {
      setPasswordError("");
    }
  }, [password]);

  useEffect(() => {
    const init = async () => {
      try {
        // 1) Verifica hash (#access_token=...) — padrão comum do Supabase
        const hash = window.location.hash || "";
        if (hash.includes("access_token") || hash.includes("type=recovery")) {
          console.log("Hash encontrado no URL");
          const { error } = await supabase.auth.exchangeCodeForSession(hash);
          if (error) {
            console.error("Erro ao trocar código por sessão:", error);
            setMessage({
              text: "O link de redefinição é inválido ou expirou.",
              type: "error"
            });
          } else {
            setSessionReady(true);
          }
          setChecking(false);
          return;
        }

        // 2) Verifica query string (?code=...) — alguns setups usam code na query
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (code) {
          console.log("Código encontrado na query");
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            console.error("Erro ao trocar código por sessão (query):", error);
            setMessage({
              text: "O link de redefinição é inválido ou expirou.",
              type: "error"
            });
          } else {
            setSessionReady(true);
          }
          setChecking(false);
          return;
        }

        // 3) Se houver parâmetro de erro na URL
        const err = params.get("error") || params.get("error_description");
        if (err) {
          const errorMessage = decodeURIComponent(String(err).replace(/\+/g, " "));
          console.error("Erro na URL:", errorMessage);
          setMessage({
            text: `Erro: ${errorMessage}`,
            type: "error"
          });
          setChecking(false);
          return;
        }

        // 4) Nenhum token encontrado
        setMessage({
          text: "Link inválido ou expirado. Por favor, solicite um novo link de redefinição de senha.",
          type: "error"
        });
      } catch (error) {
        console.error("Erro inesperado ao validar link:", error);
        setMessage({
          text: "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
          type: "error"
        });
      } finally {
        setChecking(false);
      }
    };

    init();
  }, [supabase]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!password || !confirmPassword) {
      setMessage({
        text: "Por favor, preencha todos os campos.",
        type: "error"
      });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({
        text: "As senhas não coincidem. Por favor, verifique e tente novamente.",
        type: "error"
      });
      return;
    }

    const pwdError = validatePassword(password);
    if (pwdError) {
      setMessage({
        text: pwdError,
        type: "error"
      });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        console.error("Erro ao atualizar senha:", error);
        throw error;
      }

      setMessage({
        text: "Senha atualizada com sucesso! Redirecionando para a página de login...",
        type: "success"
      });

      // Redireciona para a página de login após 3 segundos
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 3000);
      
    } catch (error: unknown) {
      console.error("Erro ao redefinir senha:", error);
      const err = error as { message?: string };
      setMessage({ 
        text: err.message || "Ocorreu um erro ao redefinir sua senha. Por favor, tente novamente.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
    
    
  };

  // Função para renderizar mensagens de forma estilizada
  const renderMessage = () => {
    if (!message.text) return null;

    const isError = message.type === "error";
    const Icon = isError ? AlertCircle : CheckCircle;

    return (
      <Alert variant={isError ? "destructive" : "default"} className="mb-6">
        <Icon className="h-4 w-4" />
        <AlertTitle>{isError ? "Erro" : "Sucesso!"}</AlertTitle>
        <AlertDescription>
          {message.text}
        </AlertDescription>
      </Alert>
    );
  };

  // Adicionando validação para garantir que o componente seja renderizado corretamente
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Redefinir Senha</h1>
          <p className="text-gray-600">
            {sessionReady
              ? "Digite sua nova senha"
              : checking
                ? "Validando seu link..."
                : "Link de redefinição inválido"}
          </p>
        </div>

        {checking ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : !sessionReady ? (
          <div className="space-y-4">
            {renderMessage()}
            <div className="text-center">
              <Link
                href="/auth/forgot-password"
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                Solicitar novo link de redefinição
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                Dica: copie o link do e-mail e cole na barra do navegador (alguns clientes de e-mail removem a parte depois do &quot;#&quot;).
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            {renderMessage()}
            <div>
              <Label htmlFor="password">Nova senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full mt-1"
              />
              {password && passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirme a nova senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full mt-1"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !!passwordError}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Atualizando..." : "Redefinir senha"}
            </Button>

            <div className="text-center mt-4">
              <Link
                href="/auth/login"
                className="text-sm text-blue-600 hover:underline flex items-center justify-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar para o login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
