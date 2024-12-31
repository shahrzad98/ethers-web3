/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from "react";
import { GraphQLClient } from "graphql-request";
import { subgraph } from "utils/configs";
import useWebWallet from "hooks/use-web-wallet/useWebWallet";

export interface SubgraphName {
    spark: string;
    predictor: string;
}

export type SubgraphTypeName = "spark" | "predictor";

export interface SubgraphType {
    [chainId: number]: SubgraphName;
}

export const createGraphQLClient = (chainId?: number, type: SubgraphTypeName = "spark") => {
    const _subgraph: SubgraphType = subgraph;
    const endpoint = _subgraph[chainId || Number(Object.keys(subgraph)[0])][type];

    const graphQLClient = new GraphQLClient(endpoint);
    return graphQLClient;
};

export const useGraphQLClient = (type: SubgraphTypeName = "spark") => {
    const { chainId } = useWebWallet();
    return useMemo(() => createGraphQLClient(chainId, type), [chainId, type]);
};
