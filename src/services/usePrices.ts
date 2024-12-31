import axios from "axios";
import { useQuery } from "react-query";
import { offchain } from "utils/configs";

const getMarketInformation = (token: string) => {
    const endpoint = `https://api.coingecko.com/api/v3/coins/${token}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

    return axios.get(endpoint).then(({ data }) => {
        return {
            price: data?.market_data?.current_price?.usd?.toFixed(4),
            marketCap: data?.market_data?.market_cap.usd,
            circulatingSupply: Math.round(data?.market_data?.circulating_supply),
        };
    });
};

const getOffchainInformation = (token: string) => {
    const endpoint = offchain.predictor + token;
    return axios.get(endpoint).then(({ data }) => {
        return {
            price: data?.data?.TOTM?.quote?.USD?.price.toFixed(4),
            marketCap: data?.data?.TOTM?.quote?.USD?.market_cap,
            circulatingSupply: Math.round(data?.data?.TOTM?.circulating_supply),
        };
    });
};

const usePrices = () => {
    const { data: totm } = useQuery("totmprice", () => getOffchainInformation("totmprice"));
    const { data: btc } = useQuery("bitcoin", () => getMarketInformation("bitcoin"));
    return {
        totmPrice: totm?.price,
        btcPrice: btc?.price,
    };
};

export default usePrices;
