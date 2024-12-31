/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useIDOPredictionPoolFactoryContract } from "./contracts";
import { getErrorMessage } from "hooks/use-web-wallet/useWebWallet";
import useNotification from "hooks/useNotification";
import { toIdoTokenValue, toTokenValue } from "utils/convert";

export const useIDOPredictionPoolFactory = () => {
    const notification = useNotification();
    const idoPredictionPoolFactory = useIDOPredictionPoolFactoryContract();

    const _IDOTokenAddress = "0x84f92e412c4c94cc410f1bc279a7709520d45d6b";

    //read contract

    const getIdoTokenBank = () => {
        return idoPredictionPoolFactory?.idoTokenBank();
    };
    const isPoolCreator = (account: string) => {
        return idoPredictionPoolFactory?.isPoolCreator(account);
    };
    const getRewardManager = () => {
        return idoPredictionPoolFactory?.rewardManager();
    };
    const getStakingPoolTaxRate = () => {
        return idoPredictionPoolFactory?.stakingPoolTaxRate();
    };
    const getSparksToken = () => {
        return idoPredictionPoolFactory?.sparksToken();
    };
    const getUsdTokenAddress = () => {
        return idoPredictionPoolFactory?.usdTokenAddress();
    };

    //write contract

    // const create = (_newPool: any) => {
    //     const newPool: any = {
    //         maturityTime: _newPool.maturityTime || 1096000,
    //         lockTime: _newPool.lockTime || 402000,
    //         sizeAllocation: toTokenValue(_newPool.sizeAllocation || 12000),
    //         stakeApr: _newPool.stakeApr || 6000,
    //         totemPrizeUnit: toTokenValue(_newPool.totemPrizeUnit || 600),
    //         idoTokenUnit: toIdoTokenValue(_newPool.idoTokenUnit || 1000),
    //         idoToken: _newPool.idoToken || _IDOTokenAddress,
    //     };

    //     return idoPredictionPoolFactory
    //         ?.create(
    //             newPool.maturityTime || 0,
    //             newPool.lockTime || 0,
    //             newPool.sizeAllocation || 0,
    //             newPool.stakeApr || 0,
    //             newPool.totemPrizeUnit || 0,
    //             newPool.idoTokenUnit || 0,
    //             newPool.idoToken || "",
    //         )
    //         .then((res: any) => {})
    //         .catch((error: any) => {
    //             notification.error(getErrorMessage(error));
    //         });
    // };

    const addPoolCreator = (creatorPoolAccount: string) => {
        return idoPredictionPoolFactory
            ?.addPoolCreator(creatorPoolAccount)
            .then((res: any) => {})
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };

    return {
        getIdoTokenBank,
        isPoolCreator,
        getRewardManager,
        getStakingPoolTaxRate,
        getSparksToken,
        getUsdTokenAddress,
        // create,
        addPoolCreator,
        contract: idoPredictionPoolFactory || false,
    };
};
