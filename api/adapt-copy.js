// /api/adapt-copy.js
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
    const { originalCopy, adaptationRequest, params } = req.body;

    // Validation
    if (!originalCopy || !adaptationRequest) {
      return res.status(400).json({ 
        error: 'Original Copy und Anpassungsanfrage sind erforderlich' 
      });
    }

    // Adaptation Prompt erstellen
    const adaptationPrompt = `Ändere folgenden Copy basierend auf der Anweisung:

URSPRÜNGLICHER COPY:
"${originalCopy}"

ÄNDERUNGSANWEISUNG:
"${adaptationRequest}"

BEHALTE BEI:
- ChristiansHRS 2.0 Style
- Gewerk: ${params.service || 'Nicht angegeben'}
${params.target ? `- Zielgruppe: ${params.target}` : ''}
${params.usp ? `- USP: ${params.usp}` : ''}
- 10-Punkte-Regelwerk beachten
- Stilmittel-Markierungen: <span style="border-bottom: 2px solid lightblue;">Text</span>

WICHTIGE REGELN:
- NIEMALS Konkurrenz schlecht machen
- POSITIV-DIREKT formulieren
- Probleme benennen, aber konstruktiv
- Direkte, ehrliche Kommunikation
- Konkrete Fakten statt Marketing-Floskeln

Schreibe den angepassten Copy:`;

    // Claude API Call
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 800,
        messages: [{
          role: 'user',
          content: adaptationPrompt
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
    const adaptedCopy = data.content[0].text;

    return res.status(200).json({ 
      adaptedCopy: adaptedCopy,
      success: true 
    });

  } catch (error) {
    console.error('Adapt Copy Error:', error);
    return res.status(500).json({ 
      error: 'Interner Server-Fehler: ' + error.message 
    });
  }
}
