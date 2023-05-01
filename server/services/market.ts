import axios from 'axios';

interface CryptoPrice {
    symbol: string;
    price: number;
    change: number;
}

export type SupportedSymbols = "USDT" | "BTC" | "TBTC" | "ETH" | "BNB" | "TRX" | "DOGE"

const IDlist: { [key in SupportedSymbols]: string } = {
    BTC: "bitcoin",
    ETH: "ethereum",
    TRX: "tron",
    TBTC: "tbtc",
    BNB: "binancecoin",
    DOGE: "dogecoin",
    USDT: "tether",
}

export async function getCryptoPrices(symbols: SupportedSymbols[]): Promise<CryptoPrice[]> {
    const prices: CryptoPrice[] = [];

    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
            params: {
                vs_currency: 'usd',
                ids: symbols.map(symbol => IDlist[symbol]).join(','),
            },
            timeout: 5000
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
    } catch (error: any) {
        console.error(`Fetching prices from api.coingecko.com failed: status code ${error.code}`);
        return prices;
    }

    return prices;
}