import { BigNumberish } from "ethers";
import { PredictionPool } from "./predictionPool";
import { Status } from "./status";

export interface StakeData {
    stakes: Stake[];
    total: number;
}
export class Stake {
    id?: string;
    pool?: PredictionPool;
    status?: Status;
    stake?: string | number;
    pricePrediction1?: string | number;
    pricePrediction2?: string | number;
    finalPrice?: number | string = "---";
    position?: number | string = "---";
    allocation?: number | string = "---";
    rewards?: number | string = "---";
    priceRewards?: number | string = "---";
    roi?: string | number;
    timeRemaining?: number = new Date().getTime() * 1.0005;
    _amount?: BigNumberish;
    _pricePrediction1?: BigNumberish;
    _pricePrediction2?: BigNumberish;
    value?: string | number;
    poolAddr?: string;
}
