# Sentinel AI — Frontend

A React + TypeScript + Vite frontend for the Sentinel AI graduation project.

## Requirements
- Node.js 20+ (LTS recommended)
- npm

## Run locally
```bash
npm install
cp .env.example .env
npm run dev
```
Open the local URL printed by Vite (normally `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```

## Connect to FastAPI
The app runs with mock demonstration data by default. This allows the UI to be demonstrated before the backend is ready.

1. Start your FastAPI server.
2. Copy `.env.example` to `.env`.
3. Set:
   ```env
   VITE_USE_MOCK_API=false
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```
4. Restart the Vite dev server after changing `.env`.
5. Enable CORS in FastAPI for `http://localhost:5173`.

### Expected API contract

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/dashboard/summary` | Dashboard metrics and chart series |
| GET | `/alerts` | Alert list |
| PATCH | `/alerts/{id}/status` | Update triage status; JSON `{ "status": "In Review" }` |
| GET | `/rules` | Detection rules |
| PATCH | `/rules/{id}` | Toggle a rule; JSON `{ "enabled": true }` |
| POST | `/logs/import` | Multipart upload; field name `file` |
| GET | `/ml/insights` | Phase 2 ML status and insights |

### Response shapes
See `src/types.ts` for the canonical TypeScript interfaces. The backend should return:
- Dashboard summary: `DashboardSummary`
- Alert list: `SecurityAlert[]`
- Updated alert: `SecurityAlert`
- Rules: `DetectionRule[]`
- Import: `LogImportResult`
- ML insights: `{ model, status, scoredEntities, highAnomalies, message }`

**Important:** API responses should use the exact enum strings in `src/types.ts`. If the backend uses different field names, map them in `src/services/api.ts` rather than scattering conversions through UI components.

## Project structure
```text
src/
  components/   Shared layout and UI primitives
  data/         Mock demo dataset
  pages/        Overview, alerts, detail, logs, rules, ML, reports, settings
  services/     Centralized API client and mock/live switch
  types.ts      Shared API contracts
```

## Notes
- Demo mode values and activity charts are simulated placeholders, not real detection results.
- The upload mock estimates CSV/JSON record counts only. Real parsing, validation, detection, persistence, and Isolation Forest must be implemented by the backend.
- The UI does not perform automated blocking or defensive actions.
- Thresholds and mock alert examples are illustrative and must be aligned with the approved dataset and backend rules.
