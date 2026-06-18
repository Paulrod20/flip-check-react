export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function resolvePlatform(query: string): string | null {
  const normalizedQuery = normalizeText(query)
  if (!normalizedQuery) return null

  const sorted = [...platforms].sort((a, b) => b.length - a.length)
  for (const platform of sorted) {
    if (normalizeText(platform) === normalizedQuery) {
      return platform
    }
  }
  return null
}

export const platforms: string[] = [
    // Microsoft
    'Xbox',
    'Xbox 360',
    'Xbox One',
    'Xbox One S',
    'Xbox One X',
    'Xbox Series S',
    'Xbox Series X',
  
    // Sony
    'PlayStation',
    'PlayStation 2',
    'PlayStation 3',
    'PlayStation 4',
    'PlayStation 4 Pro',
    'PlayStation 5',
    'PlayStation 5 Slim',
    'PSP',
    'PS Vita',
  
    // Nintendo Home Consoles
    'NES',
    'Super Nintendo',
    'Nintendo 64',
    'Nintendo GameCube',
    'Nintendo Wii',
    'Nintendo Wii U',
    'Nintendo Switch',
    'Nintendo Switch Lite',
    'Nintendo Switch OLED',
  
    // Nintendo Handhelds
    'Game Boy',
    'Game Boy Color',
    'Game Boy Advance',
    'Game Boy Advance SP',
    'Nintendo DS',
    'Nintendo DS Lite',
    'Nintendo DSi',
    'Nintendo 3DS',
    'Nintendo 3DS XL',
    'Nintendo 2DS',
  
    // Sega
    'Sega Genesis',
    'Sega CD',
    'Sega Saturn',
    'Sega Dreamcast',
    'Sega Game Gear',
  
    // Atari
    'Atari 2600',
    'Atari 7800',
  
    // Other
    'Neo Geo',
    'TurboGrafx-16',
  ]