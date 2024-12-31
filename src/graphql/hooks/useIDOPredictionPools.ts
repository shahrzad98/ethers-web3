/* eslint-disable @typescript-eslint/no-unused-vars */
import { PredictionPool } from "models";
import { useQuery } from "react-query";
import { useGraphQLClient } from "hooks/useGraphQLClient";
import useRequest from "hooks/useRequest";
import { parseOffChainPool, parsePool } from "utils/pool";

import { IDOPredictionPoolsDataModel, FilterVarsModel } from "../models";
import { IDOPREDICTIONPOOLS } from "../queries/idoPredictionPools";
import { PredictionPoolData } from "models/predictionPool";

const useIDOPredictionPools = (pageNumber: number, perPage = 10, filter: any = {}) => {
    const graphQLClient = useGraphQLClient("spark");
    const offchainRequest = useRequest("spark");
    return useQuery<PredictionPoolData, FilterVarsModel>(
        [`get-ido-prediction-pools-${pageNumber}-${perPage}`, pageNumber, perPage],

        async () => {
            const offchainPoolsRequest: any = await offchainRequest.get(
                `pool/?order=desc&order_field=launch_date&page=${pageNumber}&limit=${perPage}`,
            );

            const offchainPools = offchainPoolsRequest?.data?.pools?.filter((i: any) => i.launchDate !== 0);

            const idoPredictionPoolsId = offchainPools
                .map((pool: PredictionPool) => {
                    return pool?.poolCreatedEvent?.Pool?.toLowerCase();
                })
                .filter((i: any) => i);

            let idopredictionPools: any = [];
            try {
                const { idopredictionPools: idopredictionPoolsTemp }: IDOPredictionPoolsDataModel =
                    await graphQLClient.request(IDOPREDICTIONPOOLS, {
                        first: perPage,
                        where: {
                            id_in: idoPredictionPoolsId,
                        },
                        skip: pageNumber * perPage,

                        orderBy: "launchDate",
                        orderDirection: "desc",
                    });
                idopredictionPools = idopredictionPoolsTemp;
            } catch (e) {
                idopredictionPools = [];
            }

            const offchainPoolsTemp =
                offchainPools?.map((_offchainPool: PredictionPool) => {
                    const offchainPool: PredictionPool = parseOffChainPool(_offchainPool);

                    const pool: any = idopredictionPools?.find(
                        (i: any) => i?.id?.toLowerCase() === _offchainPool?.poolCreatedEvent?.Pool?.toLowerCase(),
                    );

                    return parsePool(pool, offchainPool);
                }) || [];

            const result: PredictionPoolData = {
                pools: offchainPoolsTemp
                    ? [
                          ...offchainPoolsTemp?.filter((i: any) => i.status === "Open"),
                          ...offchainPoolsTemp?.filter((i: any) => i.status !== "Open"),
                      ]
                    : ([] as PredictionPool[]),
                total: offchainPoolsRequest?.data?.count,
            };
            return result;
        },
        {
            // refetchOnWindowFocus: false,
        },
    );
};

export default useIDOPredictionPools;
