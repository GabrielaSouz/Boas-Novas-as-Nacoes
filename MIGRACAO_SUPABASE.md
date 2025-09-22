# Guia de Migração do Supabase

Este documento contém todas as informações necessárias para configurar uma nova conta no Supabase para o projeto Boas Novas às Nações.

## 1. Configuração Inicial do Projeto

1. Acesse [https://supabase.com/](https://supabase.com/) e faça login/crie uma conta
2. Crie um novo projeto
3. Anote as seguintes credenciais (disponíveis em Project Settings > API):
   - URL do projeto
   - Chave pública (anon key)
   - Chave de serviço (service role key) - mantenha em segredo!

## 2. Configuração das Variáveis de Ambiente

Atualize ou crie um arquivo `.env.local` na raiz do seu projeto com as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico_do_supabase
```

## 3. Estrutura do Banco de Dados

### Tabela: events

Esta tabela armazena os eventos/atividades da organização.

```sql
CREATE TABLE public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TIME,
    location TEXT,
    type TEXT NOT NULL CHECK (type IN (
        'varal-solidario',
        'cortes-cabelo',
        'orientacoes-juridicas',
        'alimentacao',
        'afericao-pressao',
        'musica',
        'aula-de-canto',
        'reforco-pedagogico',
        'momento-comunhao'
    )),
    participants INTEGER DEFAULT 0,
    image_url TEXT
);

-- Índice para melhorar consultas por data
CREATE INDEX idx_events_date ON public.events(date);
```

### Políticas de Segurança (RLS - Row Level Security)

Habilite o Row Level Security na tabela `events` e adicione as seguintes políticas:

```sql
-- Permitir leitura pública dos eventos
CREATE POLICY "Permitir leitura pública dos eventos"
ON public.events
FOR SELECT
USING (true);

-- Permitir inserção apenas para usuários autenticados (se necessário)
CREATE POLICY "Permitir inserção por usuários autenticados"
ON public.events
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Permitir atualização apenas para administradores
CREATE POLICY "Permitir atualização por administradores"
ON public.events
FOR UPDATE
TO authenticated
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Permitir exclusão apenas para administradores
CREATE POLICY "Permitir exclusão por administradores"
ON public.events
FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
```

## 4. Configuração de Armazenamento

Se você estiver usando armazenamento de arquivos no Supabase, configure os buckets necessários:

1. Acesse a seção "Storage" no painel do Supabase
2. Crie um novo bucket chamado "event-images" (ou outro nome de sua preferência)
3. Configure as permissões conforme necessário

## 5. Autenticação

Se estiver usando autenticação de usuários, verifique as configurações em "Authentication > Settings" e:

1. Habilite os provedores de autenticação desejados (Email, Google, etc.)
2. Configure as URLs de redirecionamento no campo "Site URL"
3. Verifique as configurações de e-mail para recuperação de senha, confirmação, etc.

## 6. Funções de Banco de Dados (se aplicável)

Se você tiver funções personalizadas, armazenamentos ou triggers, certifique-se de recriá-los na nova instância.

## 7. Testes

Após a configuração, realize os seguintes testes:

1. Verifique se os eventos são carregados corretamente na página inicial
2. Teste a criação/edição/exclusão de eventos (se aplicável)
3. Verifique o upload de imagens (se estiver usando)
4. Teste a autenticação (se aplicável)

## 8. Backup e Manutenção

Configure backups regulares do seu banco de dados nas configurações do projeto Supabase.

## 9. Dicas de Desempenho

1. Monitore o uso de recursos no painel do Supabase
2. Considere adicionar índices adicionais com base nos padrões de consulta
3. Revise as políticas de segurança regularmente

## 10. Suporte

Em caso de dúvidas ou problemas, consulte a [documentação oficial do Supabase](https://supabase.com/docs) ou a comunidade.

-- Tabela para armazenar fotos da galeria
CREATE TABLE public.gallery_photos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT,
    description TEXT,
    image_url TEXT NOT NULL,
    category TEXT CHECK (category IN (
        'varal-solidario',
        'cortes-cabelo',
        'orientacoes-juridicas',
        'alimentacao',
        'afericao-pressao',
        'musica',
        'aula-de-canto',
        'reforco-pedagogico',
        'momento-comunhao',
        'outros'
    )),
    event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    is_featured BOOLEAN DEFAULT false,
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Índices para melhorar consultas
CREATE INDEX idx_gallery_photos_category ON public.gallery_photos(category);
CREATE INDEX idx_gallery_photos_event_id ON public.gallery_photos(event_id);
CREATE INDEX idx_gallery_photos_created_at ON public.gallery_photos(created_at);

-- Políticas de Segurança (RLS)
-- Permitir leitura pública das fotos
CREATE POLICY "Permitir leitura pública das fotos da galeria"
ON public.gallery_photos
FOR SELECT
USING (true);

-- Permitir inserção apenas para usuários autenticados
CREATE POLICY "Permitir inserção de fotos por usuários autenticados"
ON public.gallery_photos
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Permitir atualização apenas para administradores
CREATE POLICY "Permitir atualização de fotos por administradores"
ON public.gallery_photos
FOR UPDATE
TO authenticated
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Permitir exclusão apenas para administradores
CREATE POLICY "Permitir exclusão de fotos por administradores"
ON public.gallery_photos
FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');