import { gql } from "graphql-request";

export const IDOPREDICTIONPOOLS = gql`
    query idopredictionPools(
        $first: Int
        $skip: Int
        $where: IDOPredictionPool_filter
        $orderBy: IDOPredictionPool_orderBy
        $orderDirection: OrderDirection
    ) {
        idopredictionPools(
            first: $first
            skip: $skip
            where: $where
            orderBy: $orderBy
            orderDirection: $orderDirection
        ) {
            id
            totalStakes
            totalStaked
            launchDate
            lockTime
            maturityTime
            sizeAllocation
            stakeApr
            prizeAmount
            stakingPoolTaxRate
            minimumStakeAmount
            isLocked
            isMatured
        }
    }
`;

export const idoPredictionPoolsQueryVars = {
    first: 10,
    where: {},
    orderBy: "lockTime",
    orderDirection: "desc",
};
