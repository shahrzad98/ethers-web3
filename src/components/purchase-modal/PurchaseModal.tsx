import { FC } from "react";
import { Icon } from "components/icon";
import rocket_logo from "assets/icons/svgs/rocket.svg";
import alert_logo from "assets/icons/svgs/alert.svg";
import Icon_Spark_loading from "assets/icons/svgs/Icon_Spark_loading.svg";
import info_logo from "assets/icons/svgs/info.svg";

import { ConfirmModal, Currency, CurrencyUnit, Tooltip } from "@totemfi/ui-components";
import "./PurchaseModal.scss";
import { useIDOPredictionPool } from "services/useIDOPredictionPool";
import { Stake } from "models";
import { useMutation, useQueryClient } from "react-query";

export interface PurchaseModalProps {
    data: Stake;
    idoRecipients: any;
    amountIDOWithdrawable: any;
    onClose: any;
    isShowUsdApproveBtn: boolean;
    isShowReleaseBtn: boolean;
    isUsdEnough: boolean;
}

const PurchaseModal: FC<PurchaseModalProps> = ({
    data,
    onClose,
    idoRecipients,
    amountIDOWithdrawable,
    isShowUsdApproveBtn,
    isShowReleaseBtn,
    isUsdEnough,
}: PurchaseModalProps) => {
    const { pool } = data;

    const queryClient = useQueryClient();

    const idoPredictionPool = useIDOPredictionPool(pool?.id || "0x00");

    const mutationPurchase = useMutation((_totalCost: any): any => {
        return idoPredictionPool?.purchaseIDOToken(_totalCost, isShowReleaseBtn);
    });
    const handleConfirmPurchase = () => {
        if (!mutationPurchase?.isSuccess) {
            mutationPurchase.mutate(idoRecipients?.totalCost, {
                onSuccess: () => {
                    queryClient.invalidateQueries("get-spark-stakes");
                    queryClient.invalidateQueries("sparks-token-balance");
                    queryClient.invalidateQueries("get-user");
                    queryClient.invalidateQueries(`prediction-details-${pool?.id}`);
                    queryClient.invalidateQueries(`total-spark-reward-${pool?.id}`);
                    queryClient.invalidateQueries(`recipients-${pool?.id}`);
                    queryClient.invalidateQueries(`amount-ido-purchase-${pool?.id}`);
                    onClose(false);
                },
            });
        } else {
            onClose(false);
        }
    };

    return (
        <>
            {isShowUsdApproveBtn && (
                <ConfirmModal
                    description={
                        mutationPurchase?.isError
                            ? "We weren't able to submit Secure your allocation please try again"
                            : mutationPurchase?.isSuccess
                            ? "You secured your allocation."
                            : !isUsdEnough
                            ? "Your usdc is not enough"
                            : "Confirm to secure your allocation."
                    }
                    iconComponent={
                        mutationPurchase?.isError || !isUsdEnough ? (
                            <Icon src={alert_logo} style={{ width: 96 }} />
                        ) : mutationPurchase?.isSuccess ? (
                            <Icon src={rocket_logo} style={{ width: 81 }} />
                        ) : (
                            <></>
                        )
                    }
                    open={true}
                    onClose={() => {
                        mutationPurchase.reset();
                        onClose(false);
                    }}
                    confirmTitle={
                        mutationPurchase?.isError
                            ? "Try again"
                            : mutationPurchase?.isSuccess || !isUsdEnough
                            ? "Close"
                            : "Confirm"
                    }
                    cancelTitle={mutationPurchase?.isError ? "Close" : ""}
                    onConfirm={handleConfirmPurchase}
                    onCancel={() => {
                        onClose();
                    }}
                    confirmStyles={!mutationPurchase?.isError ? { width: "100%" } : null}
                    width="25"
                    isLoading={mutationPurchase?.isLoading}
                    iconLoadingComponent={
                        <span>
                            <Icon src={Icon_Spark_loading} style={{ width: 115 }} className="loader" />
                        </span>
                    }
                    theme="purple"
                    title={mutationPurchase?.isLoading ? "Waiting for confirmation" : undefined}
                >
                    {mutationPurchase.isError && <></>}

                    {!mutationPurchase?.isLoading && isUsdEnough && !mutationPurchase?.isSuccess && (
                        <div className="purchase-confirm-modal">
                            <div className="purchase-confirm-modal-details">
                                <div className="purchase-confirm-modal-details-item">
                                    <div className="purchase-confirm-modal-details-item-label">Allocation</div>
                                    <div className="purchase-confirm-modal-details-item-value">
                                        <Currency
                                            value={idoRecipients?.totalAmount}
                                            unit={pool?.symbol || ""}
                                            color="#811FCC"
                                        />
                                    </div>
                                </div>
                                <div className="purchase-confirm-modal-details-item">
                                    <div className="purchase-confirm-modal-details-item-label">
                                        Total Cost
                                        <Tooltip description={`Total Cost`}>
                                            <Icon style={{ opacity: "0.3" }} src={info_logo} />
                                        </Tooltip>
                                    </div>
                                    <div className="purchase-confirm-modal-details-item-value">
                                        <Currency value={idoRecipients?.totalCost} unit={CurrencyUnit.USDC} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!mutationPurchase?.isLoading && mutationPurchase?.isSuccess && (
                        <div className="purchase-confirm-modal">
                            <div className="purchase-confirm-modal-details">
                                <div className="purchase-confirm-modal-details-item">
                                    <div className="purchase-confirm-modal-details-item-label">Allocation</div>
                                    <div className="purchase-confirm-modal-details-item-value">
                                        <Currency
                                            value={idoRecipients?.totalAmount}
                                            unit={pool?.symbol || ""}
                                            color="#811FCC"
                                        />
                                    </div>
                                </div>
                                <div className="purchase-confirm-modal-details-item">
                                    <div className="purchase-confirm-modal-details-item-label">Price per AIR</div>
                                    <div className="purchase-confirm-modal-details-item-value">
                                        <Currency
                                            value={idoRecipients?.totalCost / idoRecipients?.totalAmount}
                                            unit={CurrencyUnit.USDC}
                                            color="#811FCC"
                                        />
                                    </div>
                                </div>
                                <div className="purchase-confirm-modal-details-item">
                                    <div className="purchase-confirm-modal-details-item-label">Total</div>
                                    <div className="purchase-confirm-modal-details-item-value">
                                        <Currency value={idoRecipients?.totalCost} unit={CurrencyUnit.USDC} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </ConfirmModal>
            )}

            {isShowReleaseBtn && (
                <ConfirmModal
                    description={
                        mutationPurchase?.isError
                            ? "We weren't able to submit release your allocation please try again"
                            : mutationPurchase?.isSuccess
                            ? "You successfully released your  allocation."
                            : "Confirm to Secure your allocation.  "
                    }
                    iconComponent={
                        mutationPurchase?.isError ? (
                            <Icon src={alert_logo} style={{ width: 96 }} />
                        ) : mutationPurchase?.isSuccess ? (
                            <Icon src={rocket_logo} style={{ width: 81 }} />
                        ) : (
                            <></>
                        )
                    }
                    open={true}
                    onClose={() => {
                        mutationPurchase.reset();
                        onClose(false);
                    }}
                    confirmTitle={
                        mutationPurchase?.isError ? "Try again" : mutationPurchase?.isSuccess ? "Close" : "Confirm"
                    }
                    cancelTitle={mutationPurchase?.isError ? "Close" : ""}
                    onConfirm={handleConfirmPurchase}
                    onCancel={() => {
                        onClose();
                    }}
                    confirmStyles={!mutationPurchase?.isError ? { width: "100%" } : null}
                    width="25"
                    isLoading={mutationPurchase?.isLoading}
                    iconLoadingComponent={
                        <>
                            <Icon src={Icon_Spark_loading} style={{ width: 115 }} className="loader" />
                        </>
                    }
                    theme="purple"
                    title={mutationPurchase?.isLoading ? "Waiting for confirmation" : undefined}
                >
                    {mutationPurchase.isError && <></>}

                    {!mutationPurchase?.isLoading && !mutationPurchase?.isError && (
                        <div className="purchase-confirm-modal">
                            <div className="purchase-confirm-modal-details">
                                <div className="purchase-confirm-modal-details-item">
                                    <div className="purchase-confirm-modal-details-item-label"> Allocation</div>
                                    <div className="purchase-confirm-modal-details-item-value">
                                        <Currency
                                            value={idoRecipients?.totalAmount}
                                            unit={pool?.symbol || ""}
                                            color="#811FCC"
                                        />
                                    </div>
                                </div>
                                <div className="purchase-confirm-modal-details-item">
                                    <div className="purchase-confirm-modal-details-item-label"> Amount released</div>
                                    <div className="purchase-confirm-modal-details-item-value">
                                        <Currency
                                            value={idoRecipients?.amountWithdrawn}
                                            unit={pool?.symbol || ""}
                                            color="#811FCC"
                                        />
                                    </div>
                                </div>
                                <div className="purchase-confirm-modal-details-item">
                                    <div className="purchase-confirm-modal-details-item-label">Releasable now</div>
                                    <div className="purchase-confirm-modal-details-item-value">
                                        <Currency value={amountIDOWithdrawable} unit={pool?.symbol || ""} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </ConfirmModal>
            )}
        </>
    );
};
PurchaseModal.defaultProps = {};
export default PurchaseModal;
