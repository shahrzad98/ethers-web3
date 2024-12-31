import { IDOPREDICTIONPOOL } from "../queries/idoPredictionPool";
import { PredictionPool } from "models";
import { useQuery } from "react-query";
import { useGraphQLClient } from "hooks/useGraphQLClient";
import { parseOffChainPool, parsePool } from "utils/pool";

import { IDOPredictionPoolsDataModel, FilterVarsModel } from "../models";
import useRequest from "hooks/useRequest";

const useIDOPredictionPoolById = (id: string) => {
    const graphQLClient = useGraphQLClient("spark");
    const offchainRequest = useRequest("spark");
    return useQuery<PredictionPool, FilterVarsModel>(`get-ido-prediction-pool-${id}`, async () => {
        const offchainPoolRequest: any = await offchainRequest.get(`pool/${id}`);

        const idopredictionPoolId = offchainPoolRequest?.data?.poolCreatedEvent?.Pool?.toLowerCase();

        let idopredictionPool = null;

        if (idopredictionPoolId) {
            try {
                const { idopredictionPool: idopredictionPoolTemp }: IDOPredictionPoolsDataModel =
                    await graphQLClient.request(IDOPREDICTIONPOOL, {
                        id: idopredictionPoolId,
                    });
                idopredictionPool = idopredictionPoolTemp;
            } catch (e) {
                idopredictionPool = null;
            }
        }

        const offchainPool: any = parseOffChainPool(offchainPoolRequest?.data);

        return parsePool(idopredictionPool, offchainPool);
    });
};

export default useIDOPredictionPoolById;
