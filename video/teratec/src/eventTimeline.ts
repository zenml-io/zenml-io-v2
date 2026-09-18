export const eventChapters = [
  { id: 'opening', seconds: 6 },
  { id: 'hook', seconds: 10 },
  { id: 'workflow', seconds: 22 },
  { id: 'control', seconds: 20 },
  { id: 'community', seconds: 12 },
  { id: 'customers', seconds: 18 },
  { id: 'results', seconds: 18 },
  { id: 'kitaru', seconds: 18 },
  { id: 'company', seconds: 14 },
  { id: 'closing', seconds: 12 },
] as const;
export const EVENT_FPS = 30;
export const EVENT_FRAMES = eventChapters.reduce((sum, chapter) => sum + chapter.seconds * EVENT_FPS, 0);

// Meaningful changes of state, not shader frames. Last entry is chapter end.
export const semanticBeats: Record<string, number[]> = {
  opening: [0, 85, 180], hook: [0, 115, 160, 300],
  workflow: [0, 100, 155, 245, 305, 360, 415, 505, 545, 660],
  control: [0, 150, 295, 435, 600], community: [0, 120, 240, 360],
  customers: [0, 180, 360, 540], results: [0, 180, 360, 540],
  kitaru: [0, 150, 330, 540], company: [0, 115, 265, 420],
  closing: [0, 95, 270, 360],
};
