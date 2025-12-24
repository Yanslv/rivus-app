# Setup do Supabase - RIVUS App

Este arquivo contém todas as queries SQL que devem ser executadas no Supabase para configurar o banco de dados.

## Passo 1: Acessar o SQL Editor no Supabase

1. Acesse o painel do Supabase: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor** no menu lateral
4. Clique em **New Query**

## Passo 2: Executar as Queries

Execute as queries abaixo na ordem apresentada:

### Query 1: Criar Tabelas

```sql
-- Tabela de usuários (perfis)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  has_completed_onboarding BOOLEAN DEFAULT false,
  ai_insight TEXT DEFAULT '',
  theme VARCHAR(10) DEFAULT 'dark',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de áreas da vida (Roda da Vida)
CREATE TABLE IF NOT EXISTS life_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  area_id VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  score INTEGER NOT NULL DEFAULT 5,
  icon VARCHAR(50),
  description TEXT,
  color VARCHAR(20),
  is_current BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, area_id, is_current)
);

-- Tabela de tarefas SMART
CREATE TABLE IF NOT EXISTS smart_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  completed BOOLEAN DEFAULT false,
  why_smart TEXT,
  scheduled_day VARCHAR(50),
  scheduled_time VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de histórico (snapshots da Roda da Vida)
CREATE TABLE IF NOT EXISTS wheel_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  avg_score DECIMAL(5,2) NOT NULL,
  wheel_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Query 2: Criar Índices para Performance

```sql
-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_life_areas_user ON life_areas(user_id);
CREATE INDEX IF NOT EXISTS idx_smart_tasks_user ON smart_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_wheel_history_user ON wheel_history(user_id);
CREATE INDEX IF NOT EXISTS idx_wheel_history_date ON wheel_history(user_id, date DESC);
```

### Query 3: Habilitar Row Level Security (RLS)

```sql
-- RLS (Row Level Security) - Habilitar autenticação
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE life_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE smart_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE wheel_history ENABLE ROW LEVEL SECURITY;
```

### Query 4: Criar Políticas de Segurança (RLS Policies)

```sql
-- Políticas RLS (usuários só veem seus próprios dados)

-- Políticas para user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para life_areas
CREATE POLICY "Users can view own life areas" ON life_areas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own life areas" ON life_areas
  FOR ALL USING (auth.uid() = user_id);

-- Políticas para smart_tasks
CREATE POLICY "Users can view own tasks" ON smart_tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own tasks" ON smart_tasks
  FOR ALL USING (auth.uid() = user_id);

-- Políticas para wheel_history
CREATE POLICY "Users can view own history" ON wheel_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own history" ON wheel_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## Passo 3: Habilitar Autenticação Anônima (Opcional mas Recomendado)

1. No painel do Supabase, vá em **Authentication** > **Providers**
2. Procure por **Anonymous** e habilite
3. Isso permite que usuários usem o app sem criar conta

## Passo 4: Verificar Configuração

Após executar todas as queries, verifique se as tabelas foram criadas:

1. Vá em **Table Editor** no menu lateral
2. Você deve ver as 4 tabelas criadas:
   - `user_profiles`
   - `life_areas`
   - `smart_tasks`
   - `wheel_history`

## Notas Importantes

- As políticas RLS garantem que cada usuário só acesse seus próprios dados
- A autenticação anônima permite usar o app sem login
- Todos os dados são vinculados ao `user_id` do Supabase Auth
- O histórico é salvo como JSONB para flexibilidade

## Troubleshooting

Se encontrar erros:

1. **Erro de permissão**: Certifique-se de estar logado como admin no Supabase
2. **Erro de referência**: Verifique se a tabela `auth.users` existe (deve existir por padrão)
3. **Erro de política**: Execute as queries de RLS na ordem correta
