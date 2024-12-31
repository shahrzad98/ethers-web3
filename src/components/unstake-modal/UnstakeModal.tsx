/* eslint-disable @typescript-eslint/no-empty-function */
import { FC } from "react";
import { Icon } from "components/icon";
import rocket_logo from "assets/icons/svgs/rocket.svg";
import alert_logo from "assets/icons/svgs/alert.svg";
import Icon_Spark_loading from "assets/icons/svgs/Icon_Spark_loading.svg";

import { ConfirmModal, Currency, CurrencyUnit } from "@totemfi/ui-components";
import "./UnstakeModal.scss";
import { useIDOPredictionPool } from "services/useIDOPredictionPool";
import { Stake } from "models";
import { useMutation, useQueryClient } from "react-query";

export interface UnstakeModalProps {
    data: Stake;
    onClose: any;
    originalStake: any;
    stakingRewards: any;
    predictionRewards: any;
}
const UnstakeModal: FC<UnstakeModalProps> = ({
    data,
    onClose,
    originalStake,
    stakingRewards,
    predictionRewards,
}: UnstakeModalProps) => {
    const queryClient = useQueryClient();

    const idoPredictionPool = useIDOPredictionPool(data?.pool?.id || "0x00");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mutationClaim = useMutation((_form: any): any => {
        return idoPredictionPool?.claimWithStakingReward();
    });

    const handleConfirmClaim = () => {
        if (!mutationClaim?.isSuccess) {
            mutationClaim.mutate(
                {},
                {
                    onSuccess: () => {
                        //update stakes list after call claim

                        queryClient.invalidateQueries("get-spark-stakes");
                        queryClient.invalidateQueries("sparks-token-balance");
                        queryClient.invalidateQueries("get-user");
                        queryClient.invalidateQueries(`prediction-details-${data?.pool?.id}`);
                        queryClient.invalidateQueries(`total-spark-reward-${data?.pool?.id}`);
                        queryClient.invalidateQueries(`recipients-${data?.pool?.id}`);
                        queryClient.invalidateQueries(`amount-ido-purchase-${data?.pool?.id}`);
                    },
                },
            );
        } else {
            onClose(false);
        }
    };

    return (
        <>
            <ConfirmModal
                description={
                    mutationClaim?.isError
                        ? "We weren't able to submit unstake please try again"
                        : mutationClaim?.isSuccess
                        ? "You unstaked your stake and ,collected your stak ing rewards."
                        : "Do you want to unstake your allocation ?"
                }
                iconComponent={
                    mutationClaim?.isError ? (
                        <Icon src={alert_logo} style={{ width: 96 }} />
                    ) : mutationClaim?.isSuccess ? (
                        <Icon src={rocket_logo} style={{ width: 81 }} />
                    ) : (
                        <></>
                    )
                }
                open={true}
                onClose={() => {
                    mutationClaim.reset();
                    onClose(false);
                }}
                confirmTitle={mutationClaim?.isError ? "Try again" : mutationClaim?.isSuccess ? "Close" : "Confirm"}
                cancelTitle={mutationClaim?.isError ? "Close" : ""}
                onConfirm={handleConfirmClaim}
                onCancel={() => {
                    mutationClaim?.isError ? onClose(false) : mutationClaim?.isSuccess ? () => {} : onClose(false);
                }}
                width="25"
                isLoading={mutationClaim?.isLoading}
                iconLoadingComponent={
                    <>
                        <Icon src={Icon_Spark_loading} style={{ width: 115 }} className="loader" />
                    </>
                }
                theme="purple"
                confirmStyles={!mutationClaim?.isError ? { width: "100%" } : null}
                title={mutationClaim?.isLoading ? "Waiting for confirmation" : undefined}
            >
                {mutationClaim.isError && <></>}

                {!mutationClaim?.isLoading && !mutationClaim.isError && (
                    <div className="unstake-confirm-modal">
                        <div className="unstake-confirm-modal-details">
                            <div className="unstake-confirm-modal-details-item">
                                <div className="unstake-confirm-modal-details-item-label">Original Stake</div>
                                <div className="unstake-confirm-modal-details-item-value">
                                    <Currency value={originalStake} unit={CurrencyUnit.SPRK} color="#811FCC" />
                                </div>
                            </div>
                            <div className="unstake-confirm-modal-details-item">
                                <div className="unstake-confirm-modal-details-item-label">Staking Rewards</div>
                                <div className="unstake-confirm-modal-details-item-value">
                                    <Currency value={stakingRewards} unit={CurrencyUnit.SPRK} color="#811FCC" />
                                </div>
                            </div>
                            <div className="unstake-confirm-modal-details-item">
                                <div className="unstake-confirm-modal-details-item-label">Prediction Rewards</div>
                                <div className="unstake-confirm-modal-details-item-value">
                                    <Currency value={predictionRewards} unit={CurrencyUnit.SPRK} color="#811FCC" />
                                </div>
                            </div>
                            <div className="unstake-confirm-modal-details-item">
                                <div className="unstake-confirm-modal-details-item-label">Total</div>
                                <div className="unstake-confirm-modal-details-item-value">
                                    <Currency
                                        value={originalStake + stakingRewards + predictionRewards}
                                        unit={CurrencyUnit.SPRK}
                                        color="#811FCC"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </ConfirmModal>
        </>
    );
};
UnstakeModal.defaultProps = {};
export default UnstakeModal;
