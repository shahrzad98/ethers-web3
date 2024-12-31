/* eslint-disable @typescript-eslint/no-unused-vars */
import { PredictionPool, StatusClass } from "models";
import { FC } from "react";
import { Icon } from "components/icon";
import {
    Label,
    Currency,
    CurrencyUnit,
    Progress,
    TableRow,
    TableCell,
    Timer,
    TimerShowType,
} from "@totemfi/ui-components";
import { useHistory } from "react-router";
import { untilDays, untilMinutes } from "utils/convert";
import ido_logo from "assets/icons/svgs/spark.svg";
import "./ProjectRow.scss";
export interface ProjectRowProps {
    className?: string;
    columns?: any;
    children?: React.ReactNode;
    data: PredictionPool;
}
const ProjectRow: FC<ProjectRowProps> = ({ data, columns }: ProjectRowProps) => {
    const {
        dbId,
        title,
        status = "In Progress",
        size = 0,
        totalAllocation = "TBA",
        maxPerWallet = "TBA",
        idoPrice = "TBA",
        roi = "---",
        lockDate,
        logoUrl,
        launchDate,
    } = data;
    const history = useHistory();
    return (
        <TableRow
            className="project-row"
            onClick={() => {
                history.push(`/project-details/${dbId}`);
            }}
            title="Click to show details"
        >
            <TableCell dataHead={columns[0]?.title}>
                <div className="project-row-title">
                    <Icon src={logoUrl || ido_logo} style={{ width: "30px", borderRadius: "50%" }} />
                    <h1>{title}</h1>
                </div>
            </TableCell>
            <TableCell dataHead={columns[1]?.title}>
                {totalAllocation !== "TBA" ? (
                    <Currency value={totalAllocation} unit={CurrencyUnit.DOLLAR} />
                ) : (
                    totalAllocation
                )}
            </TableCell>
            <TableCell dataHead={columns[2]?.title}>
                {maxPerWallet !== "TBA" ? <Currency value={maxPerWallet} unit={CurrencyUnit.DOLLAR} /> : maxPerWallet}
            </TableCell>
            <TableCell dataHead={columns[3]?.title}>
                {idoPrice !== "TBA" ? <Currency value={idoPrice} unit={CurrencyUnit.DOLLAR} /> : idoPrice}
            </TableCell>
            <TableCell dataHead={columns[4]?.title}> {status === "Completed" ? roi : "-"}</TableCell>
            <TableCell dataHead={columns[5]?.title}>
                {/* <Progress className="project-row-progress" label={status} percent={size} theme="purple" /> */}

                {status === "Not started yet" ? (
                    "Not started yet"
                ) : status === "Completed" ? (
                    ""
                ) : (
                    <Timer
                        epoch={status === "Open" ? lockDate || new Date().getTime() : new Date().getTime()}
                        size={75}
                        mode={TimerShowType.COLON}
                    />
                )}
            </TableCell>
            <TableCell dataHead={columns[6]?.title}>
                <Label style={{ borderRadius: "1.6em" }} className="project-row-status" color={StatusClass[status]}>
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
            </TableCell>
        </TableRow>
    );
};
ProjectRow.defaultProps = {};
export default ProjectRow;
