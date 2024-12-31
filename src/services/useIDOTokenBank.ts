/* eslint-disable @typescript-eslint/no-unused-vars */
import { getErrorMessage } from "hooks/use-web-wallet/useWebWallet";
import useNotification from "hooks/useNotification";
import { useIDOTokenBankContract } from "./contracts";

export const useIDOTokenBank = () => {
    const notification = useNotification();
    const idoTokenBank = useIDOTokenBankContract();

    //read contract

    const getIDOTokenBalance = (idoTokenAddress: string) => {
        return idoTokenBank?.getIDOTokenBalance(idoTokenAddress);
    };
    const getUSDBalance = () => {
        return idoTokenBank?.getUSDBalance();
    };
    const getUSDToken = () => {
        return idoTokenBank?.getUSDToken();
    };
    const getIdosToken = () => {
        return idoTokenBank?.idos(1);
    };
    const isOperator = (account: string) => {
        return idoTokenBank?.isOperator(account);
    };
    const isRewarder = (account: string) => {
        return idoTokenBank?.isRewarder(account);
    };
    const getOwner = () => {
        return idoTokenBank?.owner();
    };
    const getPoolToIDOTokens = (account: string) => {
        return idoTokenBank?.poolToIDOTokens(account);
    };

    const addIDOPredictionWithToken = (poolAddress: string, idoTokenAddress: string) => {
        return idoTokenBank?.addIDOPredictionWithToken(poolAddress, idoTokenAddress);
    };

    //write-contract

    const addOperator = (account: string) => {
        return idoTokenBank?.addOperator(account).catch((error: any) => {
            notification.error(getErrorMessage(error));
        });
    };

    const addRewarder = (account: string) => {
        return idoTokenBank?.addRewarder(account).catch((error: any) => {
            notification.error(getErrorMessage(error));
        });
    };

    const renounceOperator = () => {
        return idoTokenBank?.renounceOperator();
    };

    const renounceOwnership = () => {
        return idoTokenBank?.renounceOwnership();
    };

    const renounceRewarder = () => {
        return idoTokenBank?.renounceRewarder();
    };

    const setOperator = (account: string) => {
        return idoTokenBank?.setOperator(account).catch((error: any) => {
            notification.error(getErrorMessage(error));
        });
    };

    const transferOwnership = (account: string) => {
        return idoTokenBank?.transferOwnership(account).catch((error: any) => {
            notification.error(getErrorMessage(error));
        });
    };

    const transferUserIDOToken = (idoTokenAddress: string, account: string, amount: string) => {
        return idoTokenBank?.transferUserIDOToken(idoTokenAddress, account, amount).catch((error: any) => {
            notification.error(getErrorMessage(error));
        });
    };

    const withdrawTokens = (stuckTokenAddress: string, amount: string, receiverAccount: string) => {
        return idoTokenBank?.withdrawTokens(stuckTokenAddress, amount, receiverAccount).catch((error: any) => {
            notification.error(getErrorMessage(error));
        });
    };

    return {
        getIDOTokenBalance,
        getUSDBalance,
        getUSDToken,
        getIdosToken,
        isOperator,
        isRewarder,
        getOwner,
        getPoolToIDOTokens,
        addIDOPredictionWithToken,
        addOperator,
        addRewarder,
        renounceOperator,
        renounceOwnership,
        renounceRewarder,
        setOperator,
        transferOwnership,
        transferUserIDOToken,
        withdrawTokens,
        contract: idoTokenBank || false,
    };
};
