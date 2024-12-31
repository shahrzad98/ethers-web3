import { Stake } from "./stake";

export class User {
    id?: string;
    stakedBalance = 0;
    availableBalance?: number | string;

    sparkAllocations?: number | string;
    sparkPendingAllocations?: number | string;

    predictorRewards?: number | string;
    predictorPendingRewards?: number | string;

    predictorStakes?: Stake[];
    sparkStakes?: Stake[];
}
