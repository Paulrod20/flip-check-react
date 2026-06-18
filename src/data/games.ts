import { normalizeText } from './platforms'

export interface Game {
  title: string
  platform: string
}

export const games: Game[] = [
  { title: 'The Last of Us Part II', platform: 'PlayStation 4' },
  { title: 'Halo Infinite', platform: 'Xbox Series X' },
  { title: 'God of War Ragnarök', platform: 'PlayStation 5' },
]

export function resolveGame(query: string): Game | null {
  const normalizedQuery = normalizeText(query)
  if (!normalizedQuery) return null

  for (const game of games) {
    if (normalizeText(game.title) === normalizedQuery) {
      return game
    }
  }
  return null
}
