import axios from 'axios';

interface CryptoPrice {
    symbol: string;
    price: number;
    change: number;
}

export async function getCryptoPrices(symbols: string[]): Promise<CryptoPrice[]> {
    const prices: CryptoPrice[] = [];
    const ids: string[] = [];

    // Get the CoinGecko IDs for the provided symbols
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        const coinList = response.data;
        for (const symbol of symbols) {
            const coin = coinList.find((c: any) => c.symbol.toLowerCase() === symbol.toLowerCase());
            if (coin) {
                ids.push(coin.id);
            }
        }
    } catch (error) {
        console.error('Error fetching coin list from CoinGecko', error);
        return prices;
    }

    // Get the current prices and price change percentage for the provided IDs
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
            params: {
                vs_currency: 'usd',
                ids: ids.join(','),
            },
        });
        const coinPrices = response.data;
        for (const coinPrice of coinPrices) {
            const priceChangePercent = coinPrice.price_change_percentage_24h || 0;
            prices.push({
                symbol: coinPrice.symbol.toUpperCase(),
                price: coinPrice.current_price,
                change: priceChangePercent,
            });
        }
    } catch (error) {
        console.error('Error fetching coin prices from CoinGecko', error);
        return prices;
    }

    return prices;
}