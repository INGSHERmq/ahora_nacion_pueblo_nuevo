# Plan de Gobierno — Pueblo Nuevo

Sitio web del Plan de Gobierno Municipal del Distrito de Pueblo Nuevo (2027–2030), conectado a Supabase.

## Características

- Landing page con todas las propuestas del plan de gobierno
- Formulario **Únete a la manada** con almacenamiento seguro
- Contador de visitas en el header
- Panel de administración con autenticación (`/admin`)
- Row Level Security (RLS) en todas las tablas
- Diseño responsivo con animaciones

## Requisitos

- Node.js 18+
- Proyecto Supabase configurado

## Configuración

1. Instalar dependencias:

```bash
npm install
```

2. Copiar variables de entorno:

```bash
cp .env.local.example .env.local
```

3. Ejecutar el script SQL en Supabase:

   - Abrir **Supabase Dashboard → SQL Editor**
   - Pegar y ejecutar el contenido de `supabase/schema.sql`

4. Crear un usuario administrador:

   - **Authentication → Users → Add user**
   - Copiar el UUID del usuario
   - Ejecutar en SQL Editor:

```sql
INSERT INTO public.admin_users (user_id)
VALUES ('TU_UUID_AQUI')
ON CONFLICT DO NOTHING;
```

5. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Seguridad

- Solo la clave **publishable** (pública) se usa en el frontend
- RLS habilitado en todas las tablas
- Los visitantes solo pueden **insertar** en `manada_leads`
- Solo administradores registrados en `admin_users` pueden leer registros
- El contador de visitas usa RPC con fingerprint diario (anti-inflado)
- Campo honeypot en el formulario contra bots básicos
- Validaciones en frontend y base de datos

## Estructura

- `src/app/page.tsx` — Landing principal
- `src/app/admin/page.tsx` — Panel administrador
- `supabase/schema.sql` — Script de base de datos
- `src/lib/plan-data.ts` — Contenido del plan de gobierno

## Producción

```bash
npm run build
npm start
```

Configura las mismas variables de entorno en tu plataforma de hosting (Vercel, etc.).
