/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useIDOPredictionPoolContract, useSparksTokenContract, useUsdContract } from "./contracts";
import { BigNumber } from "ethers";
import useWebWallet, { getErrorMessage } from "hooks/use-web-wallet/useWebWallet";
import useNotification from "hooks/useNotification";
import { parsePriceValue, parseTokenValue, toIdoTokenValue, toPriceValue, toTokenValue } from "utils/convert";

export const useIDOPredictionPool = (poolAddress: string) => {
    const notification = useNotification();
    const { account } = useWebWallet();
    const idoPredictionPool = useIDOPredictionPoolContract(poolAddress);

    const sparksToken = useSparksTokenContract();
    const usdToken = useUsdContract();

    //write-contract

    // Business :
    // before calling stake function the user should approve in spark contract
    // that want allow the IDO-prediction-pool to withdraw some amount of SPKS from his/her account.
    // if the SPKS amount was under the “tier1” then only first prediction of the user would be stored in the contract
    // and if it was more than “tier1“ then the two predictions would be stored.

    const stake = (data: any) => {
        if (account) {
            const newStake: any = {
                _amount: toTokenValue(data._amount),
                _pricePrediction1: toPriceValue(data._pricePrediction1),
                _pricePrediction2: toPriceValue(data._pricePrediction2),
            };

            return new Promise((resolve: (response: any) => void, reject) => {
                sparksToken
                    ?.approve(poolAddress, newStake._amount)
                    .then((transaction: any) => {
                        transaction
                            .wait(1)
                            .then(() => {
                                sparksToken
                                    ?.allowance(account, poolAddress)
                                    .then((allowance: any) => {
                                        const _allowance = parseTokenValue(allowance);
                                        const _amount = parseTokenValue(newStake._amount);

                                        if (_allowance >= _amount) {
                                            idoPredictionPool
                                                ?.stake(
                                                    newStake._amount,
                                                    newStake._pricePrediction1,
                                                    newStake._pricePrediction2,
                                                )
                                                .then((transaction: any) => {
                                                    transaction.wait(1).then(() => {
                                                        notification.success("Prediction confirmed");
                                                        resolve(transaction);
                                                    });
                                                })
                                                .catch((error) => {
                                                    notification.error(getErrorMessage(error));
                                                    reject(error);
                                                });
                                        } else {
                                            notification.error("allowance != newStake._amount");
                                            reject();
                                        }
                                    })
                                    .catch((error: any) => {
                                        notification.error(getErrorMessage(error));
                                        reject(error);
                                    });
                            })
                            .catch((error: any) => {
                                notification.error(getErrorMessage(error));
                                reject(error);
                            });
                    })
                    .catch((error: any) => {
                        notification.error(getErrorMessage(error));
                        reject(error);
                    });
            });
        }
    };

    const unstake = () => {
        if (account) {
            return new Promise((resolve: (response: any) => void, reject) => {
                idoPredictionPool
                    ?.unstake()
                    .then((transaction: any) => {
                        transaction.wait(1).then(() => {
                            notification.success("Prediction unstaked");
                            resolve(transaction);
                        });
                    })
                    .catch((error: any) => {
                        notification.error(getErrorMessage(error));
                        reject(error);
                    });
            });
        }
    };

    // Business :
    // all the stakers will get a staking reward from the contract.
    // if the pool wasn’t matured then users only got their staking return
    // and if the pool was matured they got the their staked amount plus the staking return.
    const claimWithStakingReward = () => {
        if (account) {
            return new Promise((resolve: (response: any) => void, reject) => {
                idoPredictionPool
                    ?.claimWithStakingReward()
                    .then((transaction: any) => {
                        transaction
                            .wait(1)
                            .then((res: any) => {
                                notification.success("Unstaked");
                                sparksToken
                                    ?.balanceOf(account)
                                    .then((balance: any) => {
                                        resolve(balance);
                                    })
                                    .catch((error: any) => {
                                        notification.error(getErrorMessage(error));
                                        reject(error);
                                    });
                            })
                            .catch((error: any) => {
                                notification.error(getErrorMessage(error));
                                reject(error);
                            });
                    })

                    .catch((error: any) => {
                        notification.error(getErrorMessage(error));
                        reject(error);
                    });
            });
        }
    };

    // Business :
    // this function return the amount of IDO token that a specific address can purchase at the time of calling.
    const getAmountIDOWithdrawableForPurchase = (winnerAddress: any): Promise<string> => {
        return new Promise((resolve: (response: any) => void) => {
            idoPredictionPool
                ?.idoWithdrawable(winnerAddress)
                .then((value: any) => {
                    resolve(parseTokenValue(value));
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    resolve("0");
                });
        });
    };
    // Business :
    // it is a variable stores the price of the IDO token for the winners of the IDO-prediction-pool
    const getPurchasePrice = (): Promise<string> => {
        return new Promise((resolve: (response: any) => void) => {
            idoPredictionPool
                ?.purchasePrice()
                .then((value: any) => {
                    resolve(parsePriceValue(value));
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    resolve("0");
                });
        });
    };

    // Business :
    // before calling this function the winner user have to calculate the exact amount of USD token that is needed
    // to buy his/her withdrawable IDO token.

    // then call the approve function of the USD token contract and allow the IDO-prediction-pool withdraw
    // that amount of USD form his/her account.

    // after these two steps the winner user can call this function with the calculated USD amount as the argument
    // and he/she will get the IDO token amount (return of idoWithdrawable function) and also the SPKS prize.
    const purchaseIDOToken = (usdAmount: string, isUsdPaid: boolean) => {
        if (account) {
            const _usdAmount = toTokenValue(usdAmount);
            if (isUsdPaid) {
                return new Promise((resolve: (response: any) => void, reject) => {
                    idoPredictionPool
                        ?.purchaseIDOToken()
                        .then((transactionPurchase: any) => {
                            transactionPurchase.wait(1).then(() => {
                                notification.success("You secured your allocation.");

                                resolve(transactionPurchase);
                            });
                        })
                        .catch((error: any) => {
                            notification.error(getErrorMessage(error));
                            reject(error);
                        });
                });
            } else {
                return new Promise((resolve: (response: any) => void, reject) => {
                    usdToken
                        ?.approve(poolAddress, _usdAmount)
                        .then((transaction) => {
                            transaction
                                .wait(1)
                                .then(() => {
                                    idoPredictionPool
                                        ?.purchaseIDOToken()
                                        .then((transactionPurchase: any) => {
                                            transactionPurchase.wait(1).then(() => {
                                                notification.success("You secured your allocation.");

                                                resolve(transactionPurchase);
                                            });
                                        })
                                        .catch((error: any) => {
                                            notification.error(getErrorMessage(error));
                                            reject(error);
                                        });
                                })
                                .catch((error) => {
                                    notification.error(getErrorMessage(error));
                                    reject(error);
                                });
                        })
                        .catch((error) => {
                            notification.error(getErrorMessage(error));
                            reject(error);
                        });
                });
            }
        }
    };

    // Business :
    // *** pool-creator ***
    // this function can only be called by the *** pool-creator *** and sets the “maturing-price”
    // as the highest price of the IDO token in its first 24 hours of listing,
    // and the “purchase-price” as the price the IDO token for winners to purchase.
    const updateIDOPrices = (maturingPrice: string, purchasePrice: string) => {
        return new Promise((resolve: (response: any) => void, reject) => {
            idoPredictionPool
                ?.updateIDOPrices(maturingPrice, purchasePrice)
                .then((res: any) => {
                    resolve(res);
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };

    // Business :
    // *** pool-creator ***
    // this function also can be called only by *** pool-creator *** and sets the schedule of purchasing IDO token.
    const setIDOScheduleParameters = (
        idoStartDate: string,
        idoWithdrawInterval: string,
        idoReleasePeriods: string,
        idoLockPeriods: string,
    ) => {
        return new Promise((resolve: (response: any) => void, reject) => {
            idoPredictionPool
                ?.setIDOScheduleParameters(idoStartDate, idoWithdrawInterval, idoReleasePeriods, idoLockPeriods)
                .then((res: any) => {
                    resolve(res);
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };

    // Business :
    // *** pool-creator ***
    // the function can only be called by *** pool-creator *** and set the winners of the pool in order.
    // (the stakers who staked more than tier4 should be considered as winners, even if they were not)
    // const setWinnerStakers = (address: string[]) => {
    //     return new Promise((resolve: (response: any) => void, reject) => {
    //         idoPredictionPool
    //             ?.setWinnerStakers(address)
    //             .then((res: any) => {
    //                 debugger;
    //                 resolve(res);
    //             })
    //             .catch((error: any) => {
    //                 notification.error(getErrorMessage(error));
    //                 reject(error);
    //             });
    //     });
    // };

    // Business :
    // before calling the end pool the IDO-token-bank contract should have some amount of IDO token to prize the winners.
    const endIDOPrediction = () => {
        return new Promise((resolve: (response: any) => void, reject) => {
            idoPredictionPool
                ?.endIDOPrediction()
                .then((res: any) => {
                    resolve(res);
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };

    //read contract

    const getStartDate = () => {
        return idoPredictionPool
            ?.startDate()
            .then((startDate) => {
                return new Date(startDate.mul(1000).toNumber());
            })
            .catch((error) => {
                notification.error(getErrorMessage(error));
            });
    };

    const getMaturityTime = () => {
        return idoPredictionPool
            ?.maturityTime()
            .then((maturityTime) => {
                return new Date(maturityTime.mul(1000).toNumber());
            })
            .catch((error) => {
                notification.error(getErrorMessage(error));
            });
    };
    const getMaturityDate = () => {
        return idoPredictionPool
            ?.startDate()
            .then((startDate) => {
                idoPredictionPool
                    ?.startDate()
                    .then((maturityTime) => {
                        idoPredictionPool
                            ?.lockTime()
                            .then((lockTime) => {
                                return new Date(startDate.add(lockTime).add(maturityTime).mul(1000).toNumber());
                            })
                            .catch((error) => {
                                notification.error(getErrorMessage(error));
                            });
                    })
                    .catch((error) => {
                        notification.error(getErrorMessage(error));
                    });
            })
            .catch((error) => {
                notification.error(getErrorMessage(error));
            });
    };

    const getLockTime = () => {
        return idoPredictionPool
            ?.lockTime()
            .then((lockTime) => {
                return new Date(lockTime.mul(1000).toNumber());
            })
            .catch((error) => {
                notification.error(getErrorMessage(error));
            });
    };
    const getLockDate = () => {
        return idoPredictionPool
            ?.startDate()
            .then((startDate) => {
                idoPredictionPool
                    ?.startDate()
                    .then((lockTime) => {
                        return new Date(startDate.add(lockTime).mul(1000).toNumber());
                    })
                    .catch((error) => {
                        notification.error(getErrorMessage(error));
                    });
            })
            .catch((error) => {
                notification.error(getErrorMessage(error));
            });
    };

    const getSizeAllocation = () => {
        return idoPredictionPool
            ?.sizeAllocation()
            .then((sizeAllocation) => {
                return parseTokenValue(sizeAllocation) * 1.05;
            })
            .catch((error) => {
                notification.error(getErrorMessage(error));
            });
    };
    const getTotalStaked = () => {
        return idoPredictionPool
            ?.totalStaked()
            .then((totalStaked) => {
                return parseTokenValue(totalStaked);
            })
            .catch((error) => {
                notification.error(getErrorMessage(error));
            });
    };

    const getRemainingAmountToStake = () => {
        return idoPredictionPool
            ?.totalStaked()
            .then((totalStaked: BigNumber) => {
                idoPredictionPool
                    ?.sizeAllocation()
                    .then((sizeAllocation: BigNumber) => {
                        const totalStakedIn = parseTokenValue(totalStaked);
                        const poolSizeAllocationIn = parseTokenValue(sizeAllocation);
                        const poolSizeLowerBandIn = poolSizeAllocationIn * 0.95;
                        const poolSizeUpperBandIn = poolSizeAllocationIn * 1.05;

                        const minimumAvailableToSake = (poolSizeLowerBandIn - totalStakedIn) / 0.97;
                        const maximumAvailableToStake = (poolSizeUpperBandIn - totalStakedIn) / 0.97;

                        const remainingAmountToStake = Math.floor(
                            (minimumAvailableToSake + maximumAvailableToStake) / 2,
                        );
                        return remainingAmountToStake;
                    })
                    .catch((error) => {
                        notification.error(getErrorMessage(error));
                    });
            })
            .catch((error) => {
                notification.error(getErrorMessage(error));
            });
    };

    const getMaturingPrice = (): Promise<string> => {
        return new Promise((resolve: (response: any) => void) => {
            idoPredictionPool
                ?.maturingPrice()
                .then((value: any) => {
                    resolve(parsePriceValue(value));
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    resolve("0");
                });
        });
    };
    const getPredictionDetails = (winnerAddress: any): Promise<any> => {
        return new Promise((resolve: (response: any) => void) => {
            idoPredictionPool
                ?.predictions(winnerAddress)
                .then((predictions: any) => {
                    const { rank, didUnstake, didPrizeWithdrawn, stakedBalance, pricePrediction1, pricePrediction2 } =
                        predictions;
                    resolve({
                        position: Math.round(Number(rank))?.toString(),
                        didUnstake,
                        rank: Math.round(Number(rank))?.toString(),
                        didPrizeWithdrawn,
                        stakedBalance: parseTokenValue(stakedBalance),
                        pricePrediction1: parsePriceValue(pricePrediction1),
                        pricePrediction2: parsePriceValue(pricePrediction2),
                    });
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    resolve({
                        position: 0,
                        didUnstake: false,
                        didPrizeWithdrawn: false,
                        rank: null,
                        stakedBalance: 0,
                        pricePrediction1: 0,
                        pricePrediction2: 0,
                    });
                });
        });
    };

    const getIdoRecipients = (winnerAddress: any): Promise<any> => {
        return new Promise((resolve: (response: any) => void) => {
            idoPredictionPool
                ?.idoRecipients(winnerAddress)
                .then((predictions: any) => {
                    idoPredictionPool.usdPriceForIDO(predictions.totalAmount).then((totalCost) => {
                        resolve({
                            isUSDPaid: predictions?.isUSDPaid,
                            totalAmount: parseTokenValue(predictions?.totalAmount), // allocation
                            totalCost: parsePriceValue(totalCost), //usd amount for  approve before purchaseIDOToken
                            amountWithdrawn: parseTokenValue(predictions?.amountWithdrawn), // amount released
                        });
                    });
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    resolve({
                        isUSDPaid: false,
                        totalAmount: 0,
                        amountWithdrawn: 0,
                        totalCost: 0,
                    });
                });
        });
    };
    const getTotalReward = (winnerAddress: any): Promise<any> => {
        return new Promise((resolve: (response: any) => void) => {
            idoPredictionPool
                ?._getTotalReward(winnerAddress)
                .then((totalReward: any) => {
                    // first === stakingRewards ==> getStakingReturn
                    // second === predictionRewards === spark Rewards

                    resolve({
                        stakingRewards: parseTokenValue(totalReward[0]),
                        predictionRewards: parseTokenValue(totalReward[1]),
                    });
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    resolve({ stakingRewards: 0, predictionRewards: 0 });
                });
        });
    };
    const getStakingReturn = (winnerAddress: any): Promise<string[] | number> => {
        return new Promise((resolve: (response: any) => void) => {
            idoPredictionPool
                ?._getStakingReturn(winnerAddress)
                .then((_stakingReturn: any) => {
                    const stakingReturn = parseTokenValue(_stakingReturn);

                    resolve(stakingReturn);
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    resolve(0);
                });
        });
    };

    //how to use
    // const { data: startDate, loading } = useQuery("StartDate", () => getStartDate());

    return {
        getAmountIDOWithdrawableForPurchase,
        stake,
        unstake,
        claimWithStakingReward,
        getPurchasePrice,
        purchaseIDOToken,
        updateIDOPrices,
        setIDOScheduleParameters,
        endIDOPrediction,
        getStartDate,
        getMaturityTime,
        getMaturityDate,
        getLockTime,
        getLockDate,
        getSizeAllocation,
        getTotalStaked,
        getRemainingAmountToStake,
        getIdoRecipients,
        getStakingReturn,
        contract: idoPredictionPool || false,
        getMaturingPrice,
        getPredictionDetails,
        getTotalReward,
    };
};
