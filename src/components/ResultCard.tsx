import type { EbayListing } from '../pages/Home'

interface ResultCardProps {
  listing: EbayListing
}

function ResultCard({ listing }: ResultCardProps) {
  return (
    <a
      href={listing.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full rounded-2xl p-6 shadow-md mb-4 flex items-center gap-4 no-underline hover:opacity-90 transition-opacity"
      style={{ backgroundColor: 'var(--color-white)', display: 'flex' }}>

      {listing.image && (
        <img
          src={`http://127.0.0.1:8000/image-proxy?url=${encodeURIComponent(listing.image)}`}
          alt={listing.title}
          className="w-16 h-16 object-contain rounded-lg flex-shrink-0"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      )}

      <div className="flex-1 min-w-0">
        <h2 className="text-base font-semibold truncate"
          style={{ color: 'var(--color-text)' }}>
          {listing.title}
        </h2>
        <p className="text-sm mt-1"
          style={{ color: 'var(--color-secondary)' }}>
          {listing.condition} · {listing.source}
        </p>
      </div>

      <span className="text-lg font-bold flex-shrink-0"
        style={{ color: 'var(--color-primary)' }}>
        ${listing.price.toFixed(2)}
      </span>

    </a>
  )
}

export default ResultCard