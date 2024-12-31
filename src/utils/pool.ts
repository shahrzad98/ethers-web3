import { PredictionPool, Stake, User } from "models";
import { Status } from "models/status";
import { parsePriceValue, parseTokenValue } from "utils/convert";
import { BigNumber } from "ethers";
import { IDOPredictionPoolModel, UserModel } from "graphql/models";

const now = new Date().getTime();

// export function calculateRange(betValue: number): number {
//     if (betValue < 27501) {
//         return Math.round((betValue / 500) * 10);
//     }
//     if (27500 < betValue && betValue < 57501) {
//         return Math.round((27500 / 500) * 10 + (30000 / 500) * 7);
//     }
//     if (57500 < betValue && betValue < 75001) {
//         return Math.round((27500 / 500) * 10 + (30000 / 500) * 7 + ((betValue - 57500) / 500) * 3.75);
//     }
//     if (betValue > 75000) {
//         return Math.round(
//             (27500 / 500) * 10 + (30000 / 500) * 7 + (17500 / 500) * 3.75 + ((betValue - 75000) / 500) * 2,
//         );
//     }
//     return 500;
// }

export function isActivePool(stakingPool: IDOPredictionPoolModel): boolean {
    return !(isLocked(stakingPool) || isMatured(stakingPool));
}
export function isMatured(stakingPool: IDOPredictionPoolModel): boolean {
    return (
        // BigNumber.from(stakingPool?.startDate || stakingPool?.launchDate)
        //     .add(stakingPool.lockTime)
        //     .add(stakingPool.maturityTime)
        //     .mul(1000)
        //     .toNumber() < now ||
        stakingPool?.isMatured
    );
}

export function isLocked(stakingPool: IDOPredictionPoolModel): boolean {
    return (
        // BigNumber.from(stakingPool?.startDate || stakingPool?.launchDate)
        //     .add(stakingPool.lockTime)
        //     .mul(1000)
        //     .toNumber() < now ||
        // 0.95 * Number(stakingPool?.sizeAllocation) - Number(stakingPool?.totalStaked) <= 0 ||
        stakingPool?.isLocked
    );
}

export function isLaunched(stakingPool: IDOPredictionPoolModel): boolean {
    return (
        BigNumber.from(stakingPool?.startDate || stakingPool?.launchDate)
            .mul(1000)
            .toNumber() < now &&
        (stakingPool?.isStarted || false)
    );
}

// const staticListOfIdo: any[] = [
//     {
//         id: "0x49c8Ec3FeC2d487f989913F6b6Ee44514F92eB25",
//         title: "IDO 1 (t1)",
//         maxPerWallet: 100,
//         idoPrice: 1,
//         totalSupply: "10,000 t1",
//     },
//     {
//         id: "0x9449338c47BebdEDe0F6C0589996d8E49edD7d17",
//         title: "IDO 2 (t2)",
//         maxPerWallet: 100,
//         idoPrice: 1,
//         totalSupply: "10,000 t2",
//     },
//     {
//         id: "0xDdFF99F9320B0323F0a6f86Aa17107C724C846df",
//         title: "IDO 3 (t3)",
//         maxPerWallet: 100,
//         idoPrice: 1,
//         totalSupply: "10,000 t3",
//     },
//     {
//         id: "0x020d4eB910D35727bD07106E5101dCE2be6515A8",
//         title: "IDO 4 (t4)",
//         maxPerWallet: 100,
//         idoPrice: 1,
//         totalSupply: "10,000 t4",
//     },
// ];

export const parseUser = (user: UserModel): User => {
    if (!user) {
        return {} as User;
    }

    const { id, totalStaked } = user;
    return {
        id,
        stakedBalance: parseTokenValue(totalStaked),
    };
};

//

// Not started yet: the  pool launch is scheduled on off-chain but is not created yet on the blockchain.

// Open: the staking pool lock-date is not reached ( isLocked === false ) and it has also capacity for other stakes, so the only status that users can stake in it.

// In Progress: ( isLocked === true ) &&  ( isMatured === false )

// Closed: the lock time is reached or the pool is filled, so users can not stake it the pool anymore.

// Matured: After maturing-date when the BTC prize amount is purchased ( isMatured === true ) , the maturing price is get from oracle and the winners are sorted, the pool is matured.

export const getPoolStatus = (pool: IDOPredictionPoolModel): Status => {
    const lockStatus = isLocked(pool);
    const maturityStatus = isMatured(pool);
    const launchStatus = isLaunched(pool);

    let status: Status = "Open";
    if (!launchStatus) {
        status = "Not started yet";
    }
    if (launchStatus) {
        status = "Open";
    }
    if (lockStatus) {
        status = "In Progress";
    }
    if (maturityStatus) {
        status = "Completed";
    }
    return status;
};

//  User’s Stake

// In Progress: winner not set.

// Claim: After the pool matured, since the users haven’t claim their stakes and also winner set. ( user is winner or loser) , unstake his/her stake  ( call unstake() func ) and if user is winner his/her can call ( purchaseIDOToken() func ) to prize amount will purchased

// Claimed:  ( didUnstake === true) , and if user is winner  (isUSDPaid === true).

export const getStakeStatus = (poolStatus: Status): Status => {
    const status: Status = poolStatus;

    return status;
};

export const parseOffChainPool = (pool: any): any => {
    if (!pool) {
        return {
            title: "TBA",
            maxPerWallet: "TBA",
            idoPrice: "TBA",
            description: "TBA",
            socialLinks: {
                websiteUrl: "",
                whitePaperUrl: "",
                twitterUrl: "",
                telegramUrl: "",
                discordUrl: "",
                mediumUrl: "",
            },
            initialSupply: "TBA",
            totalSupply: "TBA",
            totalAllocation: "TBA",
            tokenomics: [],
            value: "",
            isLocked: false,
            isMatured: false,
            isStarted: false,
            symbol: "",
            lockTime: "0",
            maturityTime: "0",
            launchDate: 0,
            roi: 0,
            stakeApr: 0,
            prizeAmount: 0,
        } as PredictionPool;
    }

    const {
        title,
        maxPerWallet,
        startPrice,
        description,
        socialLinks,
        initialSupply,
        totalAllocation,
        totalSupply,
        tokenomics,
        teamAndInvestors,
        roadMap,
        logoUrl,
        symbol,
        roi,

        isMatured,
        isLocked,
        isStarted,

        lockTime,
        maturityTime,
        launchDate,
        poolCreatedEvent,
        id,
        stakeApr,
        prizeAmount,
    } = pool;

    return {
        title,
        maxPerWallet,
        idoPrice: (startPrice || 0).toFixed(2),
        description,
        socialLinks,
        initialSupply,
        totalAllocation,
        totalSupply,
        tokenomics,
        roadMap,
        teamAndInvestors,
        logoUrl,
        symbol,
        roi,

        isMatured,
        isLocked,
        isStarted,

        lockTime,
        maturityTime,
        launchDate,
        id: poolCreatedEvent?.Pool?.toLowerCase(),
        dbId: id,
        stakeApr,
        prizeAmount,
    };
};

export const parsePool = (_pool: IDOPredictionPoolModel | null, offchainPool: PredictionPool): PredictionPool => {
    const {
        title,
        maxPerWallet,
        idoPrice,
        description,
        socialLinks,
        initialSupply,
        totalSupply,
        tokenomics,
        roadMap,
        teamAndInvestors,
        logoUrl,
        symbol,
        roi,
        totalAllocation,
        launchDate,
        lockTime,
        maturityTime,
        isLocked,
        isMatured,
        isStarted,
        dbId,
        stakeApr,
        prizeAmount,
        poolCreatedEvent,
    } = offchainPool;

    let pool;

    if (!_pool) {
        pool = {
            id: poolCreatedEvent?.Pool || offchainPool?.id,
            totalStaked: 0,
            sizeAllocation: 0,
            launchDate: launchDate || "",
            lockTime: lockTime || "",
            maturityTime: maturityTime || "",
            isLocked,
            isMatured,
            isStarted,
        } as IDOPredictionPoolModel;
    } else {
        pool = { ..._pool };
    }

    const { id, totalStaked, sizeAllocation } = pool;

    //get from offchain
    pool = { ...pool, isLocked: isLocked || false, isMatured: isMatured || false, isStarted: isStarted || false };

    const status = getPoolStatus(pool);

    const size =
        status === "Not started yet"
            ? 0
            : Math.floor((parseTokenValue(totalStaked) / parseTokenValue(sizeAllocation)) * 100);

    return {
        title,
        maxPerWallet,
        idoPrice,
        description,
        socialLinks,
        initialSupply,
        totalSupply,
        tokenomics,
        roadMap,
        teamAndInvestors,
        logoUrl,
        symbol,
        roi,
        totalAllocation,
        stakeApr,
        prizeAmount,

        id,
        dbId,
        status,
        size,
        launchDate: (launchDate || 0) * 1000,
        maturityDate: BigNumber.from(launchDate).add(lockTime).add(maturityTime).mul(1000).toNumber(),
        lockDate: BigNumber.from(launchDate).add(lockTime).mul(1000).toNumber(),
        timeRemaining:
            status === "In Progress"
                ? BigNumber.from(launchDate).add(lockTime).mul(1000).toNumber()
                : BigNumber.from(launchDate).add(lockTime).add(maturityTime).mul(1000).toNumber(),
    };
};

export const parseStakePool = (stake: Stake, offchainPool: PredictionPool): Stake => {
    if (!stake) {
        return {} as Stake;
    }

    const { id, pricePrediction1, pricePrediction2 } = stake;

    const pool = parsePool(null, offchainPool);

    return {
        id,
        pool: pool,
        status: getStakeStatus(pool.status || "Open"),
        stake: "",
        pricePrediction1: parsePriceValue(pricePrediction1 || 0),
        pricePrediction2: parsePriceValue(pricePrediction2 || 0),
        allocation: pool.totalAllocation,
        finalPrice: "",
        position: "",
    };
};
