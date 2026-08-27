-- ==============================================================================
-- FOCUSLY - ESQUEMA DE SEGURIDAD Y REGLAS ROW LEVEL SECURITY (RLS) PARA SUPABASE
-- ==============================================================================
-- Ejecuta este script en el SQL Editor de tu proyecto de Supabase para blindar 
-- completamente la base de datos contra accesos no autorizados y manipulación de datos.

-- 1. Asegurar la creación de la tabla profiles con restricciones de integridad
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT NOT NULL DEFAULT 'Jugador_Nuevo',
  user_gender TEXT DEFAULT 'any',
  selected_apps JSONB DEFAULT '[]'::jsonb,
  selected_level INTEGER DEFAULT 1 CHECK (selected_level >= 1 AND selected_level <= 10),
  user_xp INTEGER DEFAULT 0 CHECK (user_xp >= 0 AND user_xp <= 10000000),
  user_diamonds INTEGER DEFAULT 0 CHECK (user_diamonds >= 0 AND user_diamonds <= 1000000),
  login_streak INTEGER DEFAULT 0 CHECK (login_streak >= 0 AND login_streak <= 3650),
  last_login_date DATE,
  completed_count INTEGER DEFAULT 0 CHECK (completed_count >= 0),
  inventory JSONB DEFAULT '{"avatars": ["a_base"], "backgrounds": ["bg_default", "bg_light"], "skins": [], "unlockedBadges": [], "equippedAvatar": "a_base", "equippedBg": "bg_default", "equippedSkins": {}}'::jsonb,
  active_challenge JSONB DEFAULT NULL,
  completed_activities JSONB DEFAULT '[]'::jsonb,
  calendar_tasks JSONB DEFAULT '[]'::jsonb,
  blocked_apps_config JSONB DEFAULT '{}'::jsonb,
  activity_log JSONB DEFAULT '[]'::jsonb,
  active_chats_history JSONB DEFAULT '{}'::jsonb,
  coach_messages JSONB DEFAULT '[]'::jsonb,
  lang TEXT DEFAULT 'es' CHECK (lang IN ('es', 'en')),
  onboarding_done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. HABILITAR ROW LEVEL SECURITY (RLS) (CRÍTICO)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. POLÍTICAS DE SEGURIDAD PARA PROFILES

-- A) POLÍTICA DE LECTURA (SELECT):
-- Los usuarios autenticados y anónimos solo pueden leer su propio perfil.
DROP POLICY IF EXISTS "Los usuarios pueden ver su propio perfil" ON public.profiles;
CREATE POLICY "Los usuarios pueden ver su propio perfil" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- B) POLÍTICA DE INSERCIÓN (INSERT):
-- Los usuarios solo pueden insertar una fila correspondiente a su propio auth.uid().
DROP POLICY IF EXISTS "Los usuarios pueden insertar su propio perfil" ON public.profiles;
CREATE POLICY "Los usuarios pueden insertar su propio perfil" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- C) POLÍTICA DE ACTUALIZACIÓN (UPDATE):
-- Los usuarios solo pueden modificar su propio registro.
DROP POLICY IF EXISTS "Los usuarios pueden actualizar su propio perfil" ON public.profiles;
CREATE POLICY "Los usuarios pueden actualizar su propio perfil" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- D) POLÍTICA DE ELIMINACIÓN (DELETE):
-- Solo el propio usuario puede borrar su perfil si decide eliminar su cuenta.
DROP POLICY IF EXISTS "Los usuarios pueden eliminar su propio perfil" ON public.profiles;
CREATE POLICY "Los usuarios pueden eliminar su propio perfil" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = id);

-- 4. TRIGGER PARA CREAR AUTOMÁTICAMENTE EL PERFIL AL REGISTRAR UN USUARIO
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, onboarding_done, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(COALESCE(NEW.email, 'Usuario'), '@', 1)),
    FALSE,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. TRIGGER PARA ACTUALIZAR updated_at AUTOMÁTICAMENTE
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- 6. ÍNDICES PARA OPTIMIZAR RENDIMIENTO Y CONSULTAS
CREATE INDEX IF NOT EXISTS idx_profiles_updated_at ON public.profiles(updated_at);
CREATE INDEX IF NOT EXISTS idx_profiles_xp ON public.profiles(user_xp DESC);

-- 7. TABLA DE SESIONES DE ENFOQUE (HISTORIAL Y REGISTRO)
CREATE TABLE IF NOT EXISTS public.focus_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_type TEXT NOT NULL,
  duration_minutes INTEGER DEFAULT 25 CHECK (duration_minutes >= 0),
  xp_earned INTEGER DEFAULT 0 CHECK (xp_earned >= 0),
  diamonds_earned INTEGER DEFAULT 0 CHECK (diamonds_earned >= 0),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.focus_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Los usuarios pueden ver sus propias sesiones" ON public.focus_sessions;
CREATE POLICY "Los usuarios pueden ver sus propias sesiones" 
ON public.focus_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Los usuarios pueden registrar sus propias sesiones" ON public.focus_sessions;
CREATE POLICY "Los usuarios pueden registrar sus propias sesiones" 
ON public.focus_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 8. COMPATIBILIDAD CON TABLAS YA EXISTENTES (MIGRACIÓN SEGURA)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS active_chats_history JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS coach_messages JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS completed_count INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS activity_log JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS calendar_tasks JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS blocked_apps_config JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS login_streak INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_login_date DATE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS active_challenge JSONB DEFAULT NULL;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS completed_activities JSONB DEFAULT '[]'::jsonb;
