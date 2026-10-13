CREATE TABLE IF NOT EXISTS clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth_users(id) ON DELETE SET NULL,
  nome_empresa TEXT NOT NULL,
  cnpj TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  telefone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contratos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES clientes(id),
  data_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
  data_fim DATE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('active', 'pending', 'finished', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (data_fim IS NULL OR data_fim >= data_inicio)
);

CREATE TABLE IF NOT EXISTS locais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contrato_id UUID NOT NULL REFERENCES contratos(id),
  nome TEXT NOT NULL,
  endereco TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cameras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  local_id UUID NOT NULL REFERENCES locais(id),
  identificacao TEXT NOT NULL,
  modelo TEXT,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive', 'maintenance')),
  data_instalacao DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (local_id, identificacao)
);

CREATE TABLE IF NOT EXISTS eventos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  camera_id UUID NOT NULL REFERENCES cameras(id),
  tipo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  severidade TEXT NOT NULL DEFAULT 'medium'
    CHECK (severidade IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'acknowledged', 'resolved')),
  ocorrido_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chamados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES clientes(id),
  local_id UUID REFERENCES locais(id),
  evento_id UUID REFERENCES eventos(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth_users(id) ON DELETE SET NULL,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  prioridade TEXT NOT NULL DEFAULT 'medium'
    CHECK (prioridade IN ('low', 'medium', 'high', 'urgent')),
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'in_progress', 'resolved', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS contratos_cliente_id_idx ON contratos(cliente_id);
CREATE INDEX IF NOT EXISTS locais_contrato_id_idx ON locais(contrato_id);
CREATE INDEX IF NOT EXISTS cameras_local_id_idx ON cameras(local_id);
CREATE INDEX IF NOT EXISTS eventos_camera_id_idx ON eventos(camera_id);
CREATE INDEX IF NOT EXISTS eventos_ocorrido_em_idx ON eventos(ocorrido_em);
CREATE INDEX IF NOT EXISTS chamados_cliente_id_idx ON chamados(cliente_id);
CREATE INDEX IF NOT EXISTS chamados_local_id_idx ON chamados(local_id);
CREATE INDEX IF NOT EXISTS chamados_evento_id_idx ON chamados(evento_id);
CREATE INDEX IF NOT EXISTS chamados_user_id_idx ON chamados(user_id);
