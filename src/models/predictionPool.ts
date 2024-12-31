import { Status } from "./status";
import { BigNumberish } from "ethers";
export interface PredictionPoolData {
    pools: PredictionPool[];
    total: number;
}

export class PredictionPool {
    dbId?: string;
    id?: string;
    title?: string;
    status?: Status;
    size?: number;
    totalAllocation?: string | number = "TBA";
    maxPerWallet?: string = "TBA";
    idoPrice?: string = "TBA";
    roi?: string | number;
    description?: string;
    logoUrl?: string;
    roadMap?: any;
    teamAndInvestors?: any;
    socialLinks?: SocialLinks;
    initialSupply?: string;
    totalSupply?: string;
    tokenomics?: Tokenomic[];

    lockTime?: any = "0";
    maturityTime?: any = "0";
    stakeApr?: number | string;
    prizeAmount?: number | string | BigNumberish;

    launchDate?: number;
    maturityDate?: number;
    lockDate?: number;
    timeRemaining? = new Date().getTime() * 1.0005;

    isLocked?: boolean;
    isMatured?: boolean;
    isStarted?: boolean;
    symbol?: string;
    poolCreatedEvent?: any;
}

export class SocialLinks {
    websiteUrl?: string;
    whitePaperUrl?: string;
    twitterUrl?: string;
    telegramUrl?: string;
    discordUrl?: string;
    mediumUrl?: string;
}
export class Tokenomic {
    label?: string;
    value?: string;
    percent?: string;
}
