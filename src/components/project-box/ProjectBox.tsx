/* eslint-disable @typescript-eslint/no-unused-vars */
import { PredictionPool, StatusClass } from "models";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Icon } from "components/icon";
import { Label, Currency, CurrencyUnit, Timer, TimerShowType } from "@totemfi/ui-components";
import { untilDays, untilMinutes } from "utils/convert";
import ido_logo from "assets/icons/svgs/spark.svg";
import "./ProjectBox.scss";
export interface ProjectBoxProps {
    className?: string;
    children?: React.ReactNode;
    data: PredictionPool;
}
const ProjectBox: FC<ProjectBoxProps> = ({ data, className }: ProjectBoxProps) => {
    const {
        dbId,
        title,
        status = "In Progress",
        size = 0,
        totalAllocation = "TBA",
        maxPerWallet = "TBA",
        idoPrice = "TBA",
        lockDate,
        logoUrl,
        launchDate,
    } = data;
    return (
        <Link to={`/project-details/${dbId}`} className={`project-box box ${!!className && className}`}>
            <div className="project-box-header">
                <div className="project-box-header-title">
                    <Icon src={logoUrl || ido_logo} style={{ width: "40px", borderRadius: "50%" }} />
                    <h1>{title}</h1>
                </div>
                <div className="project-box-header-status">
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
            </div>
            <div className="project-box-timer">
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
            <div className="project-box-options">
                <div className="project-box-options-item">
                    <div className="project-box-options-item-label">Total Allocation</div>
                    <div className="project-box-options-item-value">
                        {totalAllocation !== "TBA" ? (
                            <Currency value={totalAllocation} unit={CurrencyUnit.DOLLAR} />
                        ) : (
                            totalAllocation
                        )}
                    </div>
                </div>
                <div className="project-box-options-item">
                    <div className="project-box-options-item-label">Max Per Wallet</div>
                    {maxPerWallet !== "TBA" ? (
                        <Currency value={maxPerWallet} unit={CurrencyUnit.DOLLAR} />
                    ) : (
                        maxPerWallet
                    )}
                </div>
                <div className="project-box-options-item">
                    <div className="project-box-options-item-label">IDO price</div>
                    {idoPrice !== "TBA" ? <Currency value={idoPrice} unit={CurrencyUnit.DOLLAR} /> : idoPrice}
                </div>
            </div>
            {/* <div className="project-box-progress">
                <Progress label={status} percent={size} theme="purple" />
            </div> */}
        </Link>
    );
};
ProjectBox.defaultProps = {};
export default ProjectBox;
