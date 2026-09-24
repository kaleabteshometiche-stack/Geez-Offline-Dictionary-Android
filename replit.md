# የግዕዝ መዝገበ ቃላት

Offline Geez, Amharic, and English dictionary app for Android with local search across words, verbs, and phrases.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Mobile: Expo 57 + Expo Router, React Native 0.86
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/geez-dictionary/app/index.tsx` — the offline dictionary screen
- `artifacts/geez-dictionary/data/dictionary.ts` — bundled starter dictionary records and metadata
- `artifacts/geez-dictionary/constants/colors.ts` — mobile color tokens
- `artifacts/geez-dictionary/app.json` — app identity and Android package

## Architecture decisions

- The first build is frontend-only and keeps its searchable records in the app bundle so the dictionary works without a network connection.
- The app uses a single focused search screen rather than tabs; category chips keep words, verbs, and phrases one tap away.
- The Android package identifier is `com.kaleabteshome.geezdictionary` to match the supplied source project.

## Product

- Search Geez, Amharic, or English locally.
- Filter results by all entries, words, verbs, or phrases.
- Show Geez entries with Amharic and English meanings.
- Show the credited author and offline dataset note.

## User preferences

- The primary app content should remain in Amharic/Geez with English translations.

## Gotchas

- The bundled dictionary is generated from the supplied Python dataset builder; rerunning it replaces `artifacts/geez-dictionary/data/dictionary.json` with freshly downloaded licensed-source records.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
