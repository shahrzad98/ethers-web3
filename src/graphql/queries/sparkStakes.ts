import { gql } from "graphql-request";

export const STAKES = gql`
    query stakes(
        $first: Int
        $skip: Int
        $where: Stake_filter
        $orderBy: Stake_orderBy
        $orderDirection: OrderDirection
    ) {
        stakes(first: $first, skip: $skip, where: $where, orderBy: $orderBy, orderDirection: $orderDirection) {
            id
            pricePrediction1
            pricePrediction2
            timestamp
            value

            pool {
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

            user {
                id
                totalStaked
            }
        }
    }
`;

export const stakesQueryVars = {
    first: 10,
    where: {},
    orderBy: "timestamp",
    orderDirection: "desc",
};
