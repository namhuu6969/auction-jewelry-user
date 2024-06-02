import { useEffect, useState } from 'react';
import axios from 'axios';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
const EXCHANGE_RATE_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'; // API để lấy tỷ giá hối đoái

export const TablePrice = () => {
  const [materialPrice, setMaterialPrice] = useState({
    bitcoin: null,
    gold: null,
    silver: null,
  });
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      try {
        const [cryptoResponse, exchangeRateResponse] = await Promise.all([
          axios.get(COINGECKO_API_URL),
          axios.get(EXCHANGE_RATE_API_URL),
        ]);

        const bitcoinPrice = cryptoResponse.data.bitcoin.usd;
        const usdToVndRate = exchangeRateResponse.data.rates.VND;

        const goldPriceUSD = bitcoinPrice * 0.016; // Tỉ lệ giả định
        const silverPriceUSD = bitcoinPrice * 0.0005; // Tỉ lệ giả định

        const goldPriceVND = convertToVND(goldPriceUSD, usdToVndRate);
        const silverPriceVND = convertToVND(silverPriceUSD, usdToVndRate);

        const goldPricePerL = calculatePricePerL(goldPriceVND); // L = Lượng
        const silverPricePerL = calculatePricePerL(silverPriceVND); // L = Lượng

        setMaterialPrice({
          bitcoin: bitcoinPrice,
          gold: goldPricePerL,
          silver: silverPricePerL,
        });
        setExchangeRate(usdToVndRate);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    // Fetch the prices immediately
    fetchPrices();

    // Set an interval to fetch the prices every 10 minutes (600000 milliseconds)
    const intervalId = setInterval(fetchPrices, 600000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const convertToVND = (priceInUSD, usdToVndRate) => {
    return priceInUSD * usdToVndRate;
  };

  const calculatePricePerL = (pricePerUnit) => {
    const pricePerGram = pricePerUnit / 31.1035; // 1 ounce = 31.1035 grams
    return pricePerGram * 37.5; // 1 lượng = 37.5 grams
  };

  return (
    <div className='container mx-auto'>
      <table className="table-auto bg-white shadow-md rounded border-collapse w-[50%] mx-auto font-sans">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Chất liệu</th>
            <th className="py-3 px-6 text-left">Giá mỗi lượng (37.5g) ({exchangeRate} VND)</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">Vàng</td>
            <td className="py-3 px-6 text-left">{materialPrice.gold ? materialPrice.gold.toLocaleString() : 'N/A'} VND</td>
          </tr>
          <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">Bạc</td>
            <td className="py-3 px-6 text-left">{materialPrice.silver ? materialPrice.silver.toLocaleString() : 'N/A'} VND</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
