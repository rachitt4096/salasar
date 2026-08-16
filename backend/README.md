# Salasar FastAPI backend

This backend is organized around the product flows already present in the Expo app:

- owner dashboard, trips, vehicles
- goods, customers, orders, invoices
- driver app trips, issue reporting, money, profile

## Run

```bash
cd backend
.venv/bin/python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The Expo client reads `EXPO_PUBLIC_API_URL` at build time. Copy the root `.env.example` to `.env.local` for local web development, or set the public HTTPS API URL in the EAS environment for a production build. Public Expo variables are embedded in the application, so never place passwords, signing keys, or database credentials in them. The local Compose database is exposed on port `5434` to avoid colliding with other PostgreSQL services.

## Browser access and production

The API accepts browser requests only from origins listed in `SALASAR_CORS_ORIGINS`. The setting is a JSON array, for example:

```dotenv
SALASAR_CORS_ORIGINS=["https://owner.example.com"]
```

Production startup fails if the JWT secret is left at its development default or if localhost remains in the CORS allowlist. Use `GET /api/v1/health` for liveness and `GET /api/v1/ready` for a database-backed readiness check.

In production, database schema changes are applied by Alembic and demo data is not seeded. Railway deployment settings live in `railway.toml`; when the repository root is used as the service source, configure Railway's root directory as `/backend`.

## Tata Fleet Edge push API

Configure Tata Fleet Edge to send `POST` requests to:

```text
https://<your-api-domain>/api/v1/integrations/tata-fleet/push
```

Enable the receiver and configure a unique shared secret:

```dotenv
SALASAR_TATA_FLEET_WEBHOOK_ENABLED=true
SALASAR_TATA_FLEET_WEBHOOK_SECRET=<at-least-32-random-characters>
```

Ask Tata to send the secret either as `Authorization: Bearer <secret>` or `X-Webhook-Token: <secret>`. An optional `X-Delivery-Id` enables vendor-supplied idempotency; otherwise, the backend deduplicates identical payloads by SHA-256. The receiver accepts a JSON object or array, stores the complete source payload, rejects deliveries larger than 1 MiB by default, and responds with `202 Accepted`.

## Suggested next steps

1. Add role-based authorization for owner, manager, and driver routes.
2. Add background jobs for alerts, invoice delivery, and document expiry warnings.
3. Add retention and rollups for long-term Tata Fleet telemetry.
