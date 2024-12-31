/* eslint-disable @typescript-eslint/no-unused-vars */
import { Stake, StatusClass } from "models";
import { FC, useState } from "react";
import { Icon } from "components/icon";
import { TransactionAddress } from "components/transaction-address";
import { Label, Currency, CurrencyUnit, Button, TableRow, TableCell, ButtonWidth } from "@totemfi/ui-components";
import ido_logo from "assets/icons/svgs/spark.svg";
import expand_logo from "assets/icons/svgs/expand.svg";
import "./AccountSparkAllocationsRow.scss";

import { useIDOPredictionPool } from "services/useIDOPredictionPool";
import { useQuery } from "react-query";
import useWebWallet from "hooks/use-web-wallet/useWebWallet";
import { transactionEndpoint } from "utils/configs";
import { SparkClaimDetails } from "./spark-claim-details";

import { motion, AnimatePresence } from "framer-motion";

export interface AccountSparkAllocationsRowProps {
    className?: string;
    children?: React.ReactNode;
    data: Stake;
    expand: string | null;
    setExpand: Function;
    columns?: any;
}

const AccountSparkAllocationsRow: FC<AccountSparkAllocationsRowProps> = ({
    data,
    expand,
    setExpand,
    columns,
}: AccountSparkAllocationsRowProps) => {
    const {
        id,
        pool,
        status: _status = "In Progress",
        // stake = 0,
        pricePrediction1 = 0,
        pricePrediction2 = 0,
        // finalPrice = "---",
        // position = "---",
        // allocation = "---",
    } = data;
    const { account } = useWebWallet();

    const idoPredictionPool = useIDOPredictionPool(pool?.id || "0x00");

    const { data: finalPrice } = useQuery(
        [`final-price-${pool?.id}`, account, data],
        () => idoPredictionPool.getMaturingPrice(),
        {
            refetchOnWindowFocus: false,
            enabled: !!idoPredictionPool.contract,
        },
    );

    const { data: predictionDetails } = useQuery(
        [`prediction-details-${pool?.id}`, account, data],
        () => idoPredictionPool.getPredictionDetails(account),
        {
            refetchOnWindowFocus: false,
            enabled: !!idoPredictionPool.contract,
        },
    );

    const { data: totalReward } = useQuery(
        [`total-spark-reward-${pool?.id}`, account, data],
        () => idoPredictionPool.getTotalReward(account),
        {
            refetchOnWindowFocus: false,
            enabled: !!idoPredictionPool.contract,
        },
    );

    const { data: idoRecipients } = useQuery(
        [`recipients-${pool?.id}`, account, data],
        () => idoPredictionPool.getIdoRecipients(account),
        {
            refetchOnWindowFocus: false,
            enabled: !!idoPredictionPool.contract,
        },
    );

    const { data: amountIDOWithdrawable } = useQuery(
        [`amount-ido-purchase-${pool?.id}`, account],
        () => idoPredictionPool.getAmountIDOWithdrawableForPurchase(account),
        {
            refetchOnWindowFocus: false,
            enabled: !!idoPredictionPool.contract,
        },
    );

    let status = _status;

    const isReleasedStatus =
        idoRecipients?.isUSDPaid &&
        (amountIDOWithdrawable || 0) > 0 &&
        idoRecipients?.amountWithdrawn === idoRecipients?.totalAmount;

    if (status === "Completed") {
        if (predictionDetails?.didUnstake) {
            if (predictionDetails?.rank <= 25) {
                //isWinner
                if (isReleasedStatus) {
                    status = "Claimed";
                } else {
                    status = "Claim";
                }
            } else {
                //isLoser
                status = "Claimed";
            }
        } else {
            status = "Claim";
        }
    }
    return (
        <>
            <TableRow
                className="account-spark-allocations-row"
                style={pricePrediction2 !== 0 ? { borderBottom: 0 } : {}}
            >
                <TableCell dataHead={columns[0]?.title}>
                    <span className="account-spark-allocations-row-title">
                        <Icon src={pool?.logoUrl || ido_logo} style={{ width: "30px", borderRadius: "50%" }} />
                        <h1>{pool?.title}</h1>
                    </span>
                </TableCell>
                <TableCell dataHead={columns[1]?.title}>
                    <TransactionAddress transactionEndpoint={transactionEndpoint} address={id || "0"} />
                </TableCell>
                <TableCell dataHead={columns[2]?.title}>
                    <Currency value={pricePrediction1} unit={CurrencyUnit.USDC} />
                </TableCell>
                <TableCell dataHead={columns[3]?.title}>
                    {_status === "Completed" ? (
                        <Currency size="16px" value={finalPrice || 0} unit={CurrencyUnit.USDC} />
                    ) : (
                        "-"
                    )}
                </TableCell>
                <TableCell dataHead={columns[4]?.title}>
                    {_status === "Completed" ? predictionDetails?.position : "-"}
                </TableCell>
                <TableCell dataHead={columns[5]?.title}>
                    {_status === "Completed" ? (
                        <Currency
                            size="16px"
                            value={idoRecipients?.totalAmount}
                            unit={pool?.symbol || ""}
                            color="#811FCC"
                        />
                    ) : (
                        "-"
                    )}
                </TableCell>
                <TableCell dataHead={columns[6]?.title}>
                    {_status === "Completed" ? (
                        <Currency
                            size="16px"
                            value={totalReward?.predictionRewards || 0}
                            unit={CurrencyUnit.SPRK}
                            color="#811FCC"
                        />
                    ) : (
                        "-"
                    )}
                </TableCell>
                <TableCell dataHead={columns[7]?.title}>
                    <Currency size="16px" value={predictionDetails?.stakedBalance} unit={CurrencyUnit.SPRK} />
                </TableCell>
                <TableCell dataHead={columns[8]?.title}>
                    {_status === "Completed" ? (
                        <Currency
                            size="16px"
                            value={totalReward?.stakingRewards || 0}
                            unit={CurrencyUnit.SPRK}
                            color="#811FCC"
                        />
                    ) : (
                        "-"
                    )}
                </TableCell>
                <TableCell dataHead={columns[9]?.title}>
                    <div className="account-spark-allocations-row-action">
                        {status === "Claim" ? (
                            <div className="account-spark-allocations-row-action-claim">
                                <Button
                                    width={ButtonWidth.FIT_PARENT}
                                    onClick={() => setExpand(expand === id ? null : id)}
                                    theme="purple"
                                >
                                    Claim
                                </Button>
                            </div>
                        ) : (
                            <Label className="account-spark-allocations-row-action-status" color={StatusClass[status]}>
                                {status}
                            </Label>
                        )}
                        <div
                            className={"ui-collapse" + (expand === id ? " ui-collapse-expand" : " ui-collapse-close")}
                            onClick={() => setExpand(expand === id ? null : id)}
                        >
                            <Icon src={expand_logo} />
                        </div>
                    </div>
                </TableCell>
            </TableRow>
            {pricePrediction2 !== 0 && (
                <>
                    <TableRow className="account-spark-allocations-row">
                        <TableCell dataHead={columns[0]?.title}>{""}</TableCell>
                        <TableCell dataHead={columns[1]?.title}>{""}</TableCell>
                        <TableCell dataHead={columns[2]?.title}>
                            <Currency value={pricePrediction2} unit={CurrencyUnit.USDC} />
                        </TableCell>
                        <TableCell dataHead={columns[3]?.title}>
                            {finalPrice !== "---" ? (
                                <Currency size="16px" value={finalPrice || 0} unit={CurrencyUnit.USDC} />
                            ) : (
                                finalPrice
                            )}
                        </TableCell>
                        <TableCell dataHead={columns[4]?.title}>-</TableCell>
                        <TableCell dataHead={columns[5]?.title}>-</TableCell>
                        <TableCell dataHead={columns[6]?.title}>-</TableCell>
                        <TableCell dataHead={columns[7]?.title}>-</TableCell>
                        <TableCell dataHead={columns[8]?.title}>-</TableCell>
                        <TableCell dataHead={columns[9]?.title}>{""}</TableCell>
                    </TableRow>
                </>
            )}
            <AnimatePresence>
                {expand === id && (
                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <td colSpan={10}>
                            <SparkClaimDetails
                                originalStake={Number(predictionDetails?.stakedBalance)}
                                stakingRewards={Number(totalReward?.[0])}
                                predictionRewards={Number(totalReward?.[1])}
                                didUnstake={predictionDetails?.didUnstake}
                                data={data}
                                idoRecipients={idoRecipients}
                                predictionDetails={predictionDetails}
                                amountIDOWithdrawable={amountIDOWithdrawable}
                                status={status}
                            />
                        </td>
                    </motion.tr>
                )}
            </AnimatePresence>
        </>
    );
};
AccountSparkAllocationsRow.defaultProps = {};
export default AccountSparkAllocationsRow;
