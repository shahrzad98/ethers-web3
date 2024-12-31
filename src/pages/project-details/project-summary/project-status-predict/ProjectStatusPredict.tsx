/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react";
import { PredictionPool, StatusClass } from "models";
import {
    Label,
    Time,
    Progress,
    ButtonWidth,
    Button,
    Timer,
    TimerShowType,
    Currency,
    CurrencyUnit,
} from "@totemfi/ui-components";
import { Link } from "react-router-dom";
import "./ProjectStatusPredict.scss";
import { ConnectWallet } from "components/header/connect-wallet";
import { PredictModal } from "components/predict-modal";
import { useQuery } from "react-query";
import { useIDOPredictionPool } from "services/useIDOPredictionPool";
import useWebWallet from "hooks/use-web-wallet/useWebWallet";
import { untilDays, untilMinutes } from "utils/convert";
export interface ProjectStatusPredictProps {
    data: PredictionPool;
}
const ProjectStatusPredict: FC<ProjectStatusPredictProps> = ({ data }: ProjectStatusPredictProps) => {
    const { size = 0, status = "In Progress", lockDate, launchDate } = data;
    const [showModal, setShowModal] = useState<boolean>(false);
    const { account } = useWebWallet();

    const idoPredictionPool = useIDOPredictionPool(data?.id || "0x00");

    const { data: predictionDetails } = useQuery(
        [`prediction-details-${data?.id}`, account, data?.id],
        () => idoPredictionPool.getPredictionDetails(account),
        {
            refetchOnWindowFocus: false,
            enabled: !!idoPredictionPool.contract && !!data?.id && !!account,
        },
    );

    const haveStake = predictionDetails?.stakedBalance || 0 > 0 ? true : false;

    return (
        <>
            <div className="project-status-predict ">
                <div className="project-status-predict-status">
                    <Label style={{ padding: "0.5em 3em", borderRadius: "1.6em" }} color={StatusClass[status]}>
                        {status === "Not started yet" ? (
                            <>
                                In{" "}
                                {untilDays(new Date(launchDate || 0) || new Date()) !== 0 ? (
                                    <> {untilDays(new Date(launchDate || 0) || new Date())} days</>
                                ) : (
                                    <> {untilMinutes(new Date(launchDate || 0) || new Date())} minutes</>
                                )}{" "}
                            </>
                        ) : (
                            status
                        )}
                    </Label>
                </div>
                <div className="project-status-predict-timer">
                    {status === "Not started yet" ? (
                        <Timer useCharInstead="--" epoch={new Date().getTime()} size={75} mode={TimerShowType.BOX} />
                    ) : (
                        <Timer
                            epoch={status === "Open" ? lockDate || new Date().getTime() : new Date().getTime()}
                            size={75}
                            mode={TimerShowType.BOX}
                        />
                    )}
                </div>

                <div className="project-status-predict-time">
                    {status !== "Not started yet" && <Time epoch={lockDate || new Date().getTime()} />}
                </div>
                {/* <div className="project-status-predict-progress">
                <Progress label={status} percent={size} theme="purple" />
            </div> */}

                <span className="project-status-predict-actions mb-15">
                    {haveStake ? (
                        <span className="project-status-predict-actions-prediction">
                            Your Predicted{" "}
                            <Currency value={predictionDetails?.pricePrediction1} unit={CurrencyUnit.DOLLAR} />
                            {predictionDetails?.pricePrediction2 !== 0 && (
                                <>
                                    {" "}
                                    and{" "}
                                    <Currency value={predictionDetails?.pricePrediction2} unit={CurrencyUnit.DOLLAR} />
                                </>
                            )}
                        </span>
                    ) : (
                        <>
                            {status === "Open" ? (
                                <ConnectWallet theme="purple">
                                    {data?.id && (
                                        <Button
                                            width={ButtonWidth.FIT_PARENT}
                                            onClick={() => {
                                                setShowModal(true);
                                            }}
                                            theme="purple"
                                        >
                                            Predict Now
                                        </Button>
                                    )}
                                </ConnectWallet>
                            ) : (
                                <>
                                    <ConnectWallet theme="purple">
                                        {data?.id && (
                                            <span className="project-status-predict-actions-prediction mb-15">
                                                {`You didn't predict`}
                                            </span>
                                        )}
                                    </ConnectWallet>
                                </>
                            )}
                        </>
                    )}
                </span>

                {haveStake && (
                    <Link className="project-status-predict-link" to="/account-management">
                        My Account
                    </Link>
                )}
            </div>

            <>
                {showModal && (
                    <PredictModal
                        data={data}
                        onClose={() => {
                            setShowModal(false);
                        }}
                    />
                )}
            </>
        </>
    );
};
ProjectStatusPredict.defaultProps = {};
export default ProjectStatusPredict;
