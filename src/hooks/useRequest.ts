import axios from "axios";
import { offchain } from "utils/configs";
export type OffchainTypeName = "spark" | "predictor";
export interface OffchainName {
    spark: string;
    predictor: string;
}
const useRequest = (type: OffchainTypeName = "spark") => {
    const _offchain: OffchainName = offchain;
    const endpoint = _offchain[type];
    const request = axios.create({
        baseURL: endpoint,
        timeout: 10000,
    });
    request.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                return error;
            }
            return Promise.reject(error.response);
        },
    );

    const get = (arg: any) => {
        return request.get(arg).catch(() => {
            return {};
        });
    };

    const post = (arg: any) => {
        return request.post(arg);
    };

    const all = axios.all;
    const spread = axios.spread;

    return { request, get, post, all, spread };
};

export default useRequest;
