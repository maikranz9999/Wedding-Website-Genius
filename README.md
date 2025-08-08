# Wedding Website Genius - ChristiansHRS 2.0

Intelligenter Copywriting-Bot für Hochzeitsdienstleister mit Backend-API und dynamischem CSV-basierten Anforderungssystem.

## 🚀 Features

- **ChristiansHRS 2.0 Tonalität** - Optimierter Schreibstil für Hochzeitsdienstleister
- **Backend-API Integration** - Sichere Claude API-Calls über Vercel Serverless Functions
- **Dynamische CSV-Anforderungen** - Einfach anpassbare Verwendungszwecke
- **Intelligentes Feedback-System** - Lernfähiger Bot durch User-Bewertungen
- **10-Punkte-Regelwerk** - Professionelle Copywriting-Standards
- **Chat-Interface** - Interaktive Anpassungen des generierten Contents

## 📁 Projektstruktur

```
wedding-copy-genius/
├── index.html              # Frontend-Anwendung
├── api/
│   ├── generate-copy.js    # Copy-Generierung Endpoint
│   └── adapt-copy.js       # Copy-Anpassung Endpoint
├── data/
│   └── requirements.csv    # Verwendungszwecke & Anforderungen
├── .env.example            # Umgebungsvariablen Vorlage
├── vercel.json             # Vercel-Konfiguration
└── README.md               # Diese Datei
```

## 🛠 Setup & Deployment

### 1. Umgebungsvariablen konfigurieren

Erstellen Sie eine `.env` Datei basierend auf `.env.example`:

```bash
cp .env.example .env
```

Fügen Sie Ihren Claude API-Key hinzu:
```env
CLAUDE_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 2. Vercel Deployment

```bash
# Vercel CLI installieren
npm i -g vercel

# Projekt deployen
vercel --prod

# Umgebungsvariablen in Vercel Dashboard setzen:
# CLAUDE_API_KEY = Ihr Claude API-Key
```

### 3. GitHub Integration

```bash
git init
git add .
git commit -m "Initial commit - Wedding Copy Genius Backend"
git push origin main
```

Vercel automatisch mit GitHub verbinden für kontinuierliche Deployments.

## 🔧 API-Endpoints

### POST `/api/generate-copy`

Generiert neuen Copy basierend auf Parametern.

**Request Body:**
```json
{
  "prompt": "Schreibe eine Homepage-Headline",
  "service": "Hochzeitsplanung",
  "target": "Luxussegment Brautpaare",
  "usp": "Nur 10 Hochzeiten pro Jahr",
  "tone": "christiansHRS",
  "purpose": "Haupt-Headline|5-10|Beispieltext"
}
```

**Response:**
```json
{
  "copy": "Generierter Copy-Text mit Stilmitteln...",
  "success": true
}
```

### POST `/api/adapt-copy`

Passt bestehenden Copy basierend auf Feedback an.

**Request Body:**
```json
{
  "originalCopy": "Ursprünglicher Copy...",
  "adaptationRequest": "Mach es kürzer und emotionaler",
  "params": { /* Original-Parameter */ }
}
```

**Response:**
```json
{
  "adaptedCopy": "Angepasster Copy-Text...",
  "success": true
}
```

## 📝 CSV-Anforderungen anpassen

Die Datei `data/requirements.csv` kann jederzeit bearbeitet werden:

```csv
Sektion,Verwendungszweck,Empfohlene Anzahl der Wörter,Beispiel
1. Startseite,Haupt-Headline,5–10,Beispieltext hier
```

**Automatisches Update:**
1. CSV in GitHub bearbeiten
2. Commit & Push
3. Vercel deployed automatisch
4. Neue Anforderungen sofort verfügbar

## 🔒 Sicherheit

- **API-Keys** werden sicher in Vercel-Umgebungsvariablen gespeichert
- **CORS-Headers** für sichere Frontend-Backend-Kommunikation
- **Validierung** aller eingehenden Requests
- **Fehlerbehandlung** mit aussagekräftigen Error-Messages

## 📊 Monitoring & Logging

- Vercel Analytics für Performance-Tracking
- Console-Logs für API-Debugging
- Fehler-Tracking in Vercel Dashboard

## 🎨 Anpassungen

### Tonalität ändern

In den API-Endpunkten den System-Prompt anpassen:
```javascript
// Neue Tonalität definieren
const systemPrompt = `Du bist ein professioneller Copywriter...`;
```

### Neue API-Endpunkte hinzufügen

1. Neue Datei in `/api/` erstellen
2. Vercel Serverless Function implementieren
3. Frontend-Integration hinzufügen

## 🚀 Performance

- **Serverless Functions** für optimale Skalierung
- **CSV-Caching** für schnelle Dropdown-Population
- **Error-Boundaries** für robuste User-Experience
- **Loading-States** für bessere UX

## 📋 Anforderungen

- **Claude API-Key** (Anthropic)
- **Vercel Account** für Hosting
- **GitHub Repository** für Code-Management

## 🤝 Contributing

1. Fork erstellen
2. Feature Branch: `git checkout -b feature/neues-feature`
3. Änderungen committen: `git commit -m 'Neues Feature'`
4. Branch pushen: `git push origin feature/neues-feature`
5. Pull Request erstellen

## 📄 Lizenz

MIT License - siehe LICENSE Datei für Details.

---

**Wedding Website Genius** - Professionelles Backend-API Copywriting für die Hochzeitsbranche mit ChristiansHRS 2.0 🎯
