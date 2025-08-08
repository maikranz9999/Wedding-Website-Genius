# Wedding Website Genius - ChristiansHRS 2.0

Intelligenter Copywriting-Bot für Hochzeitsdienstleister mit dynamischem CSV-basierten Anforderungssystem.

## 🚀 Features

- **ChristiansHRS 2.0 Tonalität** - Optimierter Schreibstil für Hochzeitsdienstleister
- **Dynamische CSV-Anforderungen** - Einfach anpassbare Verwendungszwecke
- **Intelligentes Feedback-System** - Lernfähiger Bot durch User-Bewertungen
- **10-Punkte-Regelwerk** - Professionelle Copywriting-Standards
- **Chat-Interface** - Interaktive Anpassungen des generierten Contents
- **Vercel/GitHub Ready** - Optimiert für moderne Deployment-Workflows

## 📁 Projektstruktur

```
wedding-copy-genius/
├── index.html              # Hauptanwendung
├── data/
│   └── requirements.csv    # Verwendungszwecke & Anforderungen
├── vercel.json             # Vercel-Konfiguration
└── README.md               # Diese Datei
```

## 🛠 Installation & Deployment

### Lokale Entwicklung

1. Repository klonen:
```bash
git clone <ihr-repository>
cd wedding-copy-genius
```

2. Lokalen Server starten (z.B. mit Python):
```bash
python -m http.server 8000
```

3. Browser öffnen: `http://localhost:8000`

### Vercel Deployment

1. Vercel CLI installieren:
```bash
npm i -g vercel
```

2. Projekt deployen:
```bash
vercel --prod
```

### GitHub Pages Deployment

1. Repository auf GitHub pushen
2. GitHub Pages in den Repository-Einstellungen aktivieren
3. Source auf "GitHub Actions" setzen
4. Automatisches Deployment erfolgt bei jedem Push

## 📝 CSV-Anforderungen anpassen

Die Datei `data/requirements.csv` enthält alle Verwendungszwecke und kann einfach bearbeitet werden:

```csv
Sektion,Verwendungszweck,Empfohlene Anzahl der Wörter,Beispiel
1. Startseite / Hero-Bereich,Haupt-Headline,5–10,Beispieltext hier
```

**Spalten:**
- `Sektion`: Kategorie (z.B. "1. Startseite / Hero-Bereich")
- `Verwendungszweck`: Beschreibung der Textart
- `Empfohlene Anzahl der Wörter`: Wortanzahl-Vorgabe
- `Beispiel`: Optionaler Beispieltext

### Neue Anforderungen hinzufügen

1. `data/requirements.csv` bearbeiten
2. Neue Zeile hinzufügen
3. Datei committen und pushen
4. Automatisches Update der Dropdown-Liste

## 🎨 Anpassungen

### Tonalität ändern

In `index.html` die Variable `tone` anpassen:
```html
<option value="christiansHRS">ChristiansHRS 2.0</option>
```

### Demo-Texte erweitern

Im JavaScript-Bereich die `demoCopies` Array erweitern:
```javascript
const demoCopies = [
    "Neuer Demo-Text hier...",
    // Weitere Demo-Texte
];
```

### Styling anpassen

CSS-Variablen in `index.html` anpassen:
```css
:root {
    --primary-color: #000000;
    --secondary-color: #333333;
    /* Weitere Variablen */
}
```

## 📊 Feedback-System

Das integrierte Feedback-System sammelt Bewertungen zu generierten Texten:

- **5-Sterne-Bewertung** mit Emojis
- **Kommentarfunktion** für detailliertes Feedback
- **Statistik-Dashboard** in der Sidebar
- **Session-basierte Speicherung** (keine persistente Datenhaltung)

## 🔧 Technische Details

### Browser-Kompatibilität

- Moderne Browser (Chrome, Firefox, Safari, Edge)
- ES6+ Features verwendet
- Fetch API für CSV-Loading
- CSS Grid/Flexbox für Layout

### Performance

- Statische HTML-Datei
- CSV wird einmalig beim Load geladen
- Minimale externe Abhängigkeiten
- Optimiert für schnelle Ladezeiten

## 🤝 Contributing

1. Fork erstellen
2. Feature Branch erstellen: `git checkout -b feature/neues-feature`
3. Änderungen committen: `git commit -m 'Neues Feature hinzugefügt'`
4. Branch pushen: `git push origin feature/neues-feature`
5. Pull Request erstellen

## 📋 Roadmap

- [ ] API-Integration für echte KI-Generierung
- [ ] Erweiterte Feedback-Auswertung
- [ ] Export-Funktionen für generierten Content
- [ ] Mehrsprachige Unterstützung
- [ ] Template-System für verschiedene Branchen

## 📄 Lizenz

MIT License - siehe LICENSE Datei für Details.

---

**Wedding Website Genius** - Professionelles Copywriting für die Hochzeitsbranche mit ChristiansHRS 2.0 🎯
