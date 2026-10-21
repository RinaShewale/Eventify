const EVENT_COVER_PHOTOS = [
  {
    keywords: ['wedding', 'engagement', 'sangeet', 'reception'],
    photos: ['photo-1519741497674-611481863552', 'photo-1511795409834-ef04bbd61622'],
  },
  {
    keywords: ['birthday', 'baby shower', 'bridal shower', 'anniversary'],
    photos: ['photo-1530103862676-de8c9debad1d', 'photo-1464366400600-7168b8af9bc3'],
  },
  {
    keywords: ['conference', 'seminar', 'workshop', 'meeting', 'launch'],
    photos: ['photo-1511578314322-379afb476865', 'photo-1505373877841-8d25f7d46678'],
  },
  {
    keywords: ['graduation', 'school', 'university'],
    photos: ['photo-1523050854058-8df90110c9f1', 'photo-1523580494863-6f3031224c94'],
  },
  {
    keywords: ['dinner', 'gala', 'banquet', 'festival', 'party'],
    photos: ['photo-1511795409834-ef04bbd61622', 'photo-1492684223066-81342ee5ff30'],
  },
];

function hash(value) {
  let result = 0;
  for (const character of String(value || 'event')) {
    result = (result * 31 + character.charCodeAt(0)) >>> 0;
  }
  return result;
}

export function createEventCoverUrl(event = {}, seed = event.id || event._id || event.title || 'event') {
  const details = [
    event.type,
    event.eventType,
    event.title,
    event.theme,
    event.description,
    event.aiPlan?.plan?.visualConcept?.title,
  ].filter(Boolean).join(' ').toLowerCase();
  const match = EVENT_COVER_PHOTOS.find(({ keywords }) => keywords.some((keyword) => details.includes(keyword)));
  const photos = match?.photos || ['photo-1492684223066-81342ee5ff30', 'photo-1511795409834-ef04bbd61622'];
  const photo = photos[hash(seed) % photos.length];

  return `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1200&q=80`;
}
