// /api/generate-copy.js
export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
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

    // System Prompt generieren
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

// System Prompt Funktion
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
10. Stilmittel: Nutze alle 40 Wörter mindestens ein rhetorisches Stilmittel

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

STILMITTEL-MARKIERUNG:
- Wenn du ein rhetorisches Stilmittel verwendest, markiere es mit <span style="border-bottom: 2px solid lightblue;">Text mit Stilmittel</span>

FORMATIERUNG:
- Verwende die Stilmittel-Markierung wie oben beschrieben
- Ansonsten keine weiteren Formatierungszeichen
- Reiner, sauberer Text
- Keine Markdown-Syntax`;

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
  }

  // Parameter hinzufügen
  prompt += `

Gewerk: ${params.service || 'Nicht angegeben'}
${params.target ? `Zielgruppe: ${params.target}` : ''}
${params.usp ? `USP: ${params.usp}` : ''}

Schreibe den Text nach diesem Regelwerk in ChristiansHRS 2.0 Style.`;

  return prompt;
}
