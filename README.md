# ELVITA FINANCE

App independiente Next.js para la web de ELVITA FINANCE.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Standalone production output
- Docker multi-stage para Coolify

## Rutas

- `/`
- `/about`
- `/services`
- `/how-it-works`
- `/calculator`
- `/testimonials`
- `/apply`
- `/contact`
- `/privacy-policy`
- `/terms`
- `/data-security`
- `/disclosures`
- `/api/health`

## Variables

Configura estas variables en `.env.local` para desarrollo y como variables de build/runtime en Coolify:

```bash
NEXT_PUBLIC_SITE_URL=https://elvitafinance.com
NEXT_PUBLIC_DEMO_ANNUAL_INTEREST_RATE=0.12
NEXT_PUBLIC_COMMERCIAL_NAME="Elvita Finance Funding Desk"
NEXT_PUBLIC_COMMERCIAL_EMAIL="funding@example.com"
NEXT_PUBLIC_COMMERCIAL_IDENTIFIER="EF-COMM-001"
```

La calculadora usa `NEXT_PUBLIC_DEMO_ANNUAL_INTEREST_RATE` como valor demo configurable. No es una tasa real publicada. Al llevarlo a Coolify, define las variables `NEXT_PUBLIC_*` antes del build porque Next.js las integra en el bundle del navegador.

## Webhook

El formulario envía desde el navegador a:

```txt
https://n8n.srv939555.hstgr.cloud/webhook/submit-forms-curated
```

Con:

- `mode: "no-cors"`
- `Content-Type: "text/plain;charset=UTF-8"`

Como `no-cors` devuelve una respuesta opaca, la UI muestra éxito cuando `fetch` resuelve.

## Seguridad De Navegador

La app no persiste SSN, EIN, firma ni documentos en `localStorage`, `sessionStorage` ni cookies.

## Despliegue En Coolify

```txt
Root directory: apps/elvita-finance
Port: 3000
Health check: /api/health
Build: Dockerfile
```

Variables de build recomendadas en Coolify:

```txt
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_DEMO_ANNUAL_INTEREST_RATE
NEXT_PUBLIC_COMMERCIAL_NAME
NEXT_PUBLIC_COMMERCIAL_EMAIL
NEXT_PUBLIC_COMMERCIAL_IDENTIFIER
```

## Revisión Legal

Las páginas legales son borradores en inglés y muestran:

```txt
DRAFT — FOR LEGAL REVIEW BEFORE PRODUCTION.
```

Revisar legalmente antes de producción.
