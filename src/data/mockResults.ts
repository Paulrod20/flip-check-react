export interface PriceSource {
    source: string
    price: number
    url: string
  }
  
  export interface GameResult {
    id: string
    title: string
    platform: string
    image: string
    prices: PriceSource[]
  }
  
  export const mockResults: GameResult[] = [
    {
      id: '1',
      title: 'The Last of Us Part II',
      platform: 'PlayStation 4',
      image: '',
      prices: [
        { source: 'eBay', price: 18.99, url: '#' },
        { source: 'PriceCharting', price: 15.00, url: '#' },
        { source: 'GameStop', price: 12.00, url: '#' },
      ],
    },
    {
      id: '2',
      title: 'Halo Infinite',
      platform: 'Xbox Series X',
      image: '',
      prices: [
        { source: 'eBay', price: 24.99, url: '#' },
        { source: 'PriceCharting', price: 22.00, url: '#' },
        { source: 'GameStop', price: 17.99, url: '#' },
      ],
    },
    {
      id: '3',
      title: 'God of War Ragnarök',
      platform: 'PlayStation 5',
      image: '',
      prices: [
        { source: 'eBay', price: 34.99, url: '#' },
        { source: 'PriceCharting', price: 30.00, url: '#' },
        { source: 'GameStop', price: 27.99, url: '#' },
      ],
    },
  ]