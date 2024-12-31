/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "react-query";
import { FilterVarsModel } from "../models";

import { parseOffChainPool, parseStakePool } from "utils/pool";

import { Stake } from "models";
import { useRequest } from "hooks";
import { StakeData } from "models/stake";

export const STAKES_PER_PAGE = 10;

const useSparkStakes = (pageNumber: number, perPage = 10, filter: any = {}, account: any) => {
    const offchainRequest = useRequest("spark");
    return useQuery<StakeData, FilterVarsModel>(
        [`get-spark-stake-${pageNumber}-${perPage}`, account, pageNumber, perPage],
        async () => {
            const offchainStakeRequest: any = await offchainRequest.get(
                `stake/?addr=${encodeURIComponent(account?.toLowerCase())}&page=${pageNumber}&limit=${perPage}`,
            );

            const offchainStakes = offchainStakeRequest?.data?.stakes;

            const offchainPoolsRequest = offchainStakes?.map((stake: Stake) => {
                return offchainRequest.get(`pool/addr/${stake?.poolAddr}`);
            });
            const offchainPools: any = (await offchainRequest.all(offchainPoolsRequest)) || [];

            const offchainStakeTemp =
                offchainStakes?.map((stake: Stake) => {
                    const offchainPool: any = offchainPools?.find(
                        (i: any) => i?.data?.poolCreatedEvent?.Pool?.toLowerCase() === stake?.poolAddr?.toLowerCase(),
                    );
                    if (!offchainPool) {
                        return null;
                    }
                    return parseStakePool(stake, parseOffChainPool(offchainPool?.data));
                }) || ([] as Stake[]);

            const result: StakeData = {
                stakes: offchainStakeTemp.filter((i: any) => i !== null),
                total: offchainStakeRequest?.data?.count,
            };
            return result;
        },
        {
            // refetchOnWindowFocus: false,
            enabled: !!account,
        },
    );
};

export default useSparkStakes;
