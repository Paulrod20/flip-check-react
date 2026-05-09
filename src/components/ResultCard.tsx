import type { GameResult } from '../data/mockResults'

interface ResultCardProps {
  game: GameResult
}

function ResultCard({ game }: ResultCardProps) {
  const lowestPrice = Math.min(...game.prices.map(p => p.price))

  return (
    <div className="w-full rounded-2xl p-6 shadow-md mb-4"
      style={{ backgroundColor: 'var(--color-white)' }}>

      <div className="mb-4">
        <h2 className="text-xl font-bold"
          style={{ color: 'var(--color-text)' }}>
          {game.title}
        </h2>
        <p className="text-sm"
          style={{ color: 'var(--color-secondary)' }}>
          {game.platform}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {game.prices.map((price) => (
          <div key={price.source}
            className="flex items-center justify-between px-4 py-2 rounded-xl"
            style={{
              backgroundColor: price.price === lowestPrice
                ? 'var(--color-secondary)'
                : 'var(--color-highlight)',
            }}>
            <span className="font-medium"
              style={{ color: 'var(--color-text)' }}>
              {price.source}
            </span>
            <span className="font-bold"
              style={{ color: 'var(--color-primary)' }}>
              ${price.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ResultCard