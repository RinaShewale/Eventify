function createSeed(value) {
  let seed = 0;
  for (const character of String(value)) {
    seed = (seed * 31 + character.charCodeAt(0)) >>> 0;
  }
  return seed || 1;
}

export function createEventCoverUrl(event, seed = event.id || event._id || event.title || Date.now()) {
  const eventType = event.type || event.eventType || 'celebration';
  const theme = event.theme || event.description;
  const imagePrompt = event.imagePrompt || event.aiPlan?.plan?.visualConcept?.imagePrompt;
  const clean = (value) => String(value || '')
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b(create|generate|image prompt|no text|no words|no lettering)\b/gi, '')
    .trim();
  const promptParts = [
    imagePrompt && clean(imagePrompt).slice(0, 170),
    event.title && `${clean(event.title).slice(0, 55)} event`,
    `${clean(eventType).slice(0, 45)} event`,
    theme && `${clean(theme).slice(0, 70)} theme`,
    event.location && `in ${clean(event.location).slice(0, 55)}`,
    'realistic event photography',
  ].filter(Boolean);
  const prompt = [...new Set(promptParts)].join(', ').slice(0, 340);

  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=800&seed=${createSeed(seed)}&nologo=true`;
}
