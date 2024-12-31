import { gql } from "graphql-request";

export const IDOPREDICTIONPOOL = gql`
    query idopredictionPool($id: String) {
        idopredictionPool(id: $id) {
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

export const idoPredictionPoolQueryVars = {
    id: "0",
};
