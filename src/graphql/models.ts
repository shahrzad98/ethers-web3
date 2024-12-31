import { BigNumberish } from "ethers";
export type SummaryModel = {
    id: string;
    totalPools: number;
    totalStaked: string;
};

export interface SummaryData {
    summary: SummaryModel;
}

export type UserModel = {
    id: string;
    totalStaked: number;
};

export interface UserDataModel {
    user: UserModel;
}
export interface UsersDataModel {
    users: UserModel[];
}

export type IDOPredictionPoolModel = {
    id: string;
    totalStakes: number | string | BigNumberish;
    totalStaked: number | string | BigNumberish;
    startDate: string;
    launchDate: string;
    lockTime: string;
    maturityTime: string;
    sizeAllocation: number | string | BigNumberish;
    usdPrizeAmount: number | string | BigNumberish;
    stakeApr: number | string;
    isLocked: boolean;
    isMatured: boolean;
    isStarted: boolean;
    idoContractAddress: string;
    idoTokenAmount: string;
    minimumStakeAmount: number | string | BigNumberish;
    stakingPoolTaxRate: number | string | BigNumberish;
    prizeAmount: number | string | BigNumberish;
    totemPrizeUnit: number | string | BigNumberish;
    idoTokenUnit?: number | string | BigNumberish;
    idoToken?: string;
};
export interface IDOPredictionPoolsDataModel {
    idopredictionPool: IDOPredictionPoolModel;
}

export interface IDOPredictionPoolsDataModel {
    idopredictionPools: IDOPredictionPoolModel[];
}

export interface StakeModel {
    id: string;
    pool: IDOPredictionPoolModel;
    user: UserModel;
    value: string;
    pricePrediction1: string;
    pricePrediction2: string;
    timestamp: number;
}

export interface StakesDataModel {
    stakes: StakeModel[];
}

export interface FilterVarsModel {
    id: string;
    first: number;
    skip: number;
    where: any;
    orderBy: string;
    orderDirection: string;
}

export type _Block_ = {
    hash: string;
    number: number;
};

export type _Meta_ = {
    block: _Block_;
    deployment: string;
    hasIndexingErrors: boolean;
};

export interface MetaData {
    _meta: _Meta_;
}
