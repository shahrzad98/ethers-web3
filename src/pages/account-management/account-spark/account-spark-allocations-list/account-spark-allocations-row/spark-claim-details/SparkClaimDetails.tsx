/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Stake } from "models";
import { FC, useState } from "react";
import { Icon } from "components/icon";
import info_logo from "assets/icons/svgs/info.svg";
import { motion, AnimatePresence } from "framer-motion";
import { Currency, CurrencyUnit, Button, ButtonWidth, ButtonForm, Label, Tooltip } from "@totemfi/ui-components";
import { UnstakeModal } from "components/unstake-modal";
import { PurchaseModal } from "components/purchase-modal";
import "./SparkClaimDetails.scss";
import { useUsdcToken } from "services/useUsdcToken";
import { useQuery } from "react-query";
import useWebWallet from "hooks/use-web-wallet/useWebWallet";

export interface SparkClaimDetailsProps {
    className?: string;
    children?: React.ReactNode;
    data: Stake;

    originalStake: any;
    stakingRewards: any;
    predictionRewards: any;
    didUnstake: any;
    status: any;
    idoRecipients: any;
    predictionDetails: any;
    amountIDOWithdrawable: any;
}

const SparkClaimDetails: FC<SparkClaimDetailsProps> = ({
    data,
    originalStake,
    stakingRewards,
    predictionRewards,
    didUnstake,
    status,
    idoRecipients,
    predictionDetails,
    amountIDOWithdrawable,
}: SparkClaimDetailsProps) => {
    const { pool } = data;
    const { account } = useWebWallet();

    const [showConfirmUnstakeModal, setShowConfirmUnstakeModal] = useState<boolean>(false);
    const [showConfirmPurchaseModal, setShowConfirmPurchaseModal] = useState<boolean>(false);

    const isShowUnstakeBtn = !didUnstake;
    const disableUnstakeBtn = !(status === "Claim");

    const isWinner = predictionDetails?.rank <= 25;

    const isShowNoPrizeLabel = status === "Claim" && !isWinner;

    const isShowUsdApproveBtn = !idoRecipients?.isUSDPaid && !isShowNoPrizeLabel;
    const disableUsdApproveBtn = !(status === "Claim" && isWinner);

    const isShowReleaseBtn = idoRecipients?.isUSDPaid;
    const disableReleaseBtn = !(
        status === "Claim" &&
        isWinner &&
        amountIDOWithdrawable > 0 &&
        idoRecipients?.amountWithdrawn !== idoRecipients?.totalAmount
    );

    const isShowReleasedLabel =
        idoRecipients?.isUSDPaid &&
        amountIDOWithdrawable > 0 &&
        idoRecipients?.amountWithdrawn === idoRecipients?.totalAmount;

    const usdcToken = useUsdcToken();
    const { data: usdcTokenBalance } = useQuery(
        ["get-usdc-token-balance", account],
        () => usdcToken.getBalance(account),
        {
            refetchOnWindowFocus: true,
            enabled: !!usdcToken.contract,
        },
    );

    const isUsdEnough = idoRecipients?.totalCost > (usdcTokenBalance || 0) ? false : true;

    return (
        <>
            <AnimatePresence>
                <motion.div
                    className="spark-claim-details"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                >
                    <div className="row">
                        <div className="col-md-6">
                            <div className="spark-claim-details-unstake row">
                                <div className="col-md-12 flex-column-align-center ">
                                    <div className="spark-claim-details-unstake-item my-5">
                                        <div className="spark-claim-details-unstake-item-label">Original Stake</div>
                                        <div className="spark-claim-details-unstake-item-value">
                                            <Currency
                                                size="16px"
                                                value={originalStake}
                                                unit={CurrencyUnit.SPRK}
                                                color="#811FCC"
                                            />
                                        </div>
                                    </div>
                                    <div className="spark-claim-details-unstake-item my-5">
                                        <div className="spark-claim-details-unstake-item-label">Staking Rewards</div>
                                        <div className="spark-claim-details-unstake-item-value">
                                            <Currency
                                                size="16px"
                                                value={stakingRewards}
                                                unit={CurrencyUnit.SPRK}
                                                color="#811FCC"
                                            />
                                        </div>
                                    </div>
                                    <div className="spark-claim-details-unstake-item my-5">
                                        <div className="spark-claim-details-unstake-item-label">Prediction Rewards</div>
                                        <div className="spark-claim-details-unstake-item-value">
                                            <Currency
                                                size="16px"
                                                value={predictionRewards}
                                                unit={CurrencyUnit.SPRK}
                                                color="#811FCC"
                                            />
                                        </div>
                                    </div>
                                    <div className="spark-claim-details-unstake-item my-20 has-border">
                                        <div className="spark-claim-details-unstake-item-label">Total</div>
                                        <div className="spark-claim-details-unstake-item-value">
                                            <Currency
                                                size="16px"
                                                value={originalStake + stakingRewards + predictionRewards}
                                                unit={CurrencyUnit.SPRK}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row spark-claim-details-purchase-btn flex-justify-center">
                                    {isShowUnstakeBtn && (
                                        <Button
                                            width={ButtonWidth.FIT_PARENT}
                                            onClick={() => {
                                                setShowConfirmUnstakeModal(true);
                                            }}
                                            buttonForm={disableUnstakeBtn ? ButtonForm.DISABLED : ButtonForm.PRIMARY}
                                            disabled={disableUnstakeBtn}
                                            theme="purple"
                                        >
                                            Unstake
                                        </Button>
                                    )}

                                    {!isShowUnstakeBtn && <Label color="gray">Unstaked</Label>}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row spark-claim-details-purchase ">
                                <div className="col-md-12 flex-column-align-center  mt-55 ">
                                    <div
                                        className={
                                            "spark-claim-details-purchase-item mb-5 flex-align-center" +
                                            (!idoRecipients?.isUSDPaid ? " height-100 mt-15" : "mt-5")
                                        }
                                    >
                                        <div className="spark-claim-details-unstake-item-label">Allocation</div>
                                        <div className="spark-claim-details-unstake-item-value">
                                            <Currency
                                                size="16px"
                                                value={idoRecipients?.totalAmount}
                                                unit={pool?.symbol || ""}
                                                color="#811FCC"
                                            />
                                        </div>
                                    </div>

                                    {idoRecipients?.isUSDPaid ? (
                                        <>
                                            <div className="spark-claim-details-purchase-item  my-5">
                                                <div className="spark-claim-details-unstake-item-label">
                                                    Amount released
                                                </div>
                                                <div className="spark-claim-details-unstake-item-value">
                                                    <Currency
                                                        size="16px"
                                                        value={idoRecipients?.amountWithdrawn}
                                                        unit={pool?.symbol || ""}
                                                        color="#811FCC"
                                                    />
                                                </div>
                                            </div>
                                            <div className="spark-claim-details-purchase-item my-20 has-border">
                                                <div className="spark-claim-details-unstake-item-label">
                                                    Releasable now
                                                </div>
                                                <div className="spark-claim-details-unstake-item-value">
                                                    <Currency
                                                        size="16px"
                                                        value={amountIDOWithdrawable}
                                                        unit={pool?.symbol || ""}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="spark-claim-details-purchase-item my-20 has-border">
                                            <div className="spark-claim-details-unstake-item-label">
                                                Total Cost
                                                <Tooltip description={`Total Cost`}>
                                                    <Icon style={{ opacity: "0.3" }} src={info_logo} />
                                                </Tooltip>
                                            </div>
                                            <div className="spark-claim-details-unstake-item-value">
                                                <Currency
                                                    size="16px"
                                                    value={idoRecipients?.totalCost}
                                                    unit={CurrencyUnit.USDC}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* <div className="row mb-20">
                                mature on :{" "}
                                <Timer
                                    epoch={data?.pool?.maturityDate || new Date().getTime()}
                                    size={75}
                                    mode={TimerShowType.COMMA}
                                    hideSeconds
                                />
                            </div> */}
                                <div className="row spark-claim-details-purchase-btn flex-justify-center">
                                    {isShowNoPrizeLabel && <Label color="gray">No Prize Won</Label>}

                                    {isShowUsdApproveBtn && (
                                        <Button
                                            width={ButtonWidth.FIT_PARENT}
                                            onClick={() => {
                                                setShowConfirmPurchaseModal(true);
                                            }}
                                            theme="purple"
                                            buttonForm={disableUsdApproveBtn ? ButtonForm.DISABLED : ButtonForm.PRIMARY}
                                            disabled={disableUsdApproveBtn}
                                        >
                                            Send USDC
                                        </Button>
                                    )}

                                    {isShowReleaseBtn && (
                                        <Button
                                            width={ButtonWidth.FIT_PARENT}
                                            onClick={() => {
                                                setShowConfirmPurchaseModal(true);
                                            }}
                                            theme="purple"
                                            buttonForm={disableReleaseBtn ? ButtonForm.DISABLED : ButtonForm.PRIMARY}
                                            disabled={disableReleaseBtn}
                                        >
                                            Release
                                        </Button>
                                    )}

                                    {isShowReleasedLabel && <Label color="gray">Released</Label>}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
            {showConfirmUnstakeModal && (
                <UnstakeModal
                    data={data}
                    originalStake={originalStake}
                    stakingRewards={stakingRewards}
                    predictionRewards={predictionRewards}
                    onClose={() => {
                        setShowConfirmUnstakeModal(false);
                    }}
                />
            )}
            {showConfirmPurchaseModal && (
                <PurchaseModal
                    data={data}
                    idoRecipients={idoRecipients}
                    amountIDOWithdrawable={amountIDOWithdrawable}
                    isShowUsdApproveBtn={isShowUsdApproveBtn}
                    isShowReleaseBtn={isShowReleaseBtn}
                    isUsdEnough={isUsdEnough}
                    onClose={() => {
                        setShowConfirmPurchaseModal(false);
                    }}
                />
            )}
        </>
    );
};
SparkClaimDetails.defaultProps = {};
export default SparkClaimDetails;
