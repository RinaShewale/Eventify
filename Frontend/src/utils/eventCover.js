function createSeed(value) {
  let seed = 0;
  for (const character of String(value)) {
    seed = (seed * 31 + character.charCodeAt(0)) >>> 0;
  }
  return seed || 1;
}

export function createEventCoverUrl(event, seed = event.id || event._id || event.title || Date.now()) {
  const prompt = [
    `Create a beautiful wide editorial photograph for a ${event.type || event.eventType || 'special'} event`,
    event.title && `event title: ${event.title}`,
    event.theme && `theme: ${event.theme}`,
    !event.theme && event.description && `theme: ${event.description}`,
    event.location && `setting in ${event.location}`,
    'authentic event styling, realistic photography, no words, no lettering',
  ].filter(Boolean).join(', ').slice(0, 480);

  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=800&seed=${createSeed(seed)}&nologo=true`;
}
