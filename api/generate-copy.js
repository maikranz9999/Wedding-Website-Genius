// /api/generate-copy.js - AKTUALISIERTE VERSION
import fs from 'fs';
import path from 'path';

// Cache für die Requirements-Daten
let requirementsCache = null;
let cacheTimestamp = null;

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, service, target, usp, tone, purpose } = req.body;

    // Validation
    if (!prompt || !service) {
      return res.status(400).json({ 
        error: 'Prompt und Gewerk sind erforderlich' 
      });
    }

    // NEUE FUNKTION: Requirements-Daten laden
    await loadRequirements();

    // System Prompt generieren (JETZT MIT BESCHREIBUNG)
    const systemPrompt = createSystemPrompt({
      prompt, service, target, usp, tone, purpose
    });

    // Claude API Call
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Claude API Error:', errorData);
      return res.status(500).json({ 
        error: 'API-Anfrage fehlgeschlagen: ' + (errorData.error?.message || 'Unbekannter Fehler')
      });
    }

    const data = await response.json();
    const generatedCopy = data.content[0].text;

    return res.status(200).json({ 
      copy: generatedCopy,
      success: true 
    });

  } catch (error) {
    console.error('Generate Copy Error:', error);
    return res.status(500).json({ 
      error: 'Interner Server-Fehler: ' + error.message 
    });
  }
}

// NEUE FUNKTION: Requirements aus JSON-Datei laden
async function loadRequirements() {
  const cacheTimeout = 5 * 60 * 1000; // 5 Minuten Cache
  
  if (requirementsCache && cacheTimestamp && 
      Date.now() - cacheTimestamp < cacheTimeout) {
    return requirementsCache;
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'requirements.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    requirementsCache = JSON.parse(fileContent);
    cacheTimestamp = Date.now();
    return requirementsCache;
  } catch (error) {
    console.error('Error loading requirements:', error);
    requirementsCache = []; // Fallback
    return requirementsCache;
  }
}

// ERWEITERTE System Prompt Funktion
function createSystemPrompt(params) {
  let prompt = `Du bist ein professioneller Copywriter für die Hochzeitsbranche, der nach einem strukturierten 10-Punkte-Regelwerk arbeitet:

1. Zielgruppenfokus: Sprich die definierte Zielgruppe direkt an
2. Klarer USP: Hebe das Alleinstellungsmerkmal hervor  
3. Emotion ohne Kitsch: Verwende echte, greifbare Bilder statt Phrasen
4. Struktur & Leserführung: Hook → Problem → Lösung → CTA
5. Verständliche Sprache: Kurze, präzise Sätze
6. Problemorientierung: Benenne konkrete Probleme der Zielgruppe
7. Prägnanz: Jeder Satz muss eine Funktion erfüllen
8. Visuelle Bildsprache: Erzeuge "Kino im Kopf"
9. Call to Action: Leite zur Handlung
10. Stilmittel: Nutze rhetorische Stilmittel natürlich im Text

CHRISTIANSHRS 2.0 STYLE - WICHTIGE REGELN:

POSITIV-DIREKT FORMULIEREN:
✅ "Ihr wisst genau, was ihr wollt"
✅ "Eure Vision verdient Realität"  
✅ "Ihr habt klare Vorstellungen"
✅ "Qualität ist euch wichtig"

NIEMALS KONKURRENZ/KOLLEGEN SCHLECHTMACHEN:
❌ "Während andere euch mit Standard-Paketen abspeisen"
❌ "Andere Anbieter versagen bei..."
❌ "Im Gegensatz zu anderen..."
❌ "Wo andere scheitern..."

PROBLEME BENENNEN - ABER RICHTIG:
✅ "Keine endlosen Telefonate"
✅ "Schluss mit Planungsstress"
✅ "Nie wieder schlaflose Nächte wegen Details"
✅ "Weg mit der Überforderung"

CHRISTIANSHRS 2.0 BEDEUTET:
- Direkte, ehrliche Kommunikation
- Konkrete Fakten statt Marketing-Floskeln
- "Real Talk" - aber immer AUFBAUEND
- Probleme lösen, nicht Schuldige suchen
- Fokus auf POSITIVE Abgrenzung durch eigene Stärken

FORMATIERUNG:
- Reiner, sauberer Text ohne jegliche Formatierungen
- Keine HTML-Tags oder Markierungen
- Keine Unterstreichungen oder Hervorhebungen
- Keine Markdown-Syntax
- Nur normaler Fließtext`;

  // Verwendungszweck hinzufügen
  if (params.purpose && params.purpose.trim() !== '') {
    const purposeParts = params.purpose.split('|');
    const verwendungszweck = purposeParts[0] || '';
    const wordCount = purposeParts[1] || '';
    const example = purposeParts[2] || '';

    prompt += `

VERWENDUNGSZWECK & TEXTLÄNGE:
- Zweck: ${verwendungszweck}
- Empfohlene Wortanzahl: ${wordCount} Wörter
${example ? `- Beispiel-Orientierung: "${example}"` : ''}
- WICHTIG: Halte dich an diese Wortanzahl-Vorgabe!`;

    // HIER DIE BESCHREIBUNG HINZUFÜGEN
    const requirementDetails = findRequirementDetails(verwendungszweck);
    
    if (requirementDetails && requirementDetails.beschreibung) {
      prompt += `

SPEZIFISCHE ANFORDERUNGEN FÜR DIESEN VERWENDUNGSZWECK:
${requirementDetails.beschreibung}`;
    }
  }

  // Parameter hinzufügen
  prompt += `

Gewerk: ${params.service || 'Nicht angegeben'}
${params.target ? `Zielgruppe: ${params.target}` : ''}
${params.usp ? `USP: ${params.usp}` : ''}

Schreibe den Text nach diesem Regelwerk in ChristiansHRS 2.0 Style.`;

  return prompt;
}

// Funktion um die richtige Beschreibung zu finden
function findRequirementDetails(verwendungszweck) {
  if (!requirementsCache || requirementsCache.length === 0) {
    return null;
  }

  // Suche in der JSON-Array-Struktur
  const match = requirementsCache.find(item => 
    item.verwendungszweck === verwendungszweck
  );

  return match || null;
}
