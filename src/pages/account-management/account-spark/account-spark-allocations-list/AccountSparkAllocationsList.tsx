/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    Tooltip,
    TableBody,
    TooltipPosition,
    Pagination,
} from "@totemfi/ui-components";
import { Icon } from "components/icon";
import { AccountSparkAllocationsRow, AccountSparkAllocationsRowLoader } from "./account-spark-allocations-row";
import info_logo from "assets/icons/svgs/info.svg";
import "./AccountSparkAllocationsList.scss";
import useSparkStakes from "graphql/hooks/useSparkStakes";
import useWebWallet from "hooks/use-web-wallet/useWebWallet";

const AccountSparkAllocationsList: FC = () => {
    const columns = [
        { title: "IDO/ICO/IEO", description: null },
        { title: "TxID", description: "TxID" },
        { title: "Prediction", description: null },
        { title: "Final Price", description: null },
        { title: "Position", description: null },
        { title: "Allocation", description: null },
        { title: "P.Rewards", description: null },
        { title: "Stake", description: null },
        { title: "Rewards", description: null },
        { title: "Status", description: null },
    ];
    const { account } = useWebWallet();
    const [currentPage, setCurrentPage] = useState(1);
    const [expand, setExpand] = useState<string | null>(null);
    const { data, isLoading } = useSparkStakes(
        currentPage - 1,
        10,
        {
            user: account ? account.toLowerCase() : "0x0",
        },
        account,
    );

    return (
        <div className="account-spark-allocations-list">
            <Table>
                <TableHead>
                    <TableRow>
                        {columns?.map((column, index) => (
                            <TableCell key={column.title || index} component="th">
                                <span>
                                    {column?.title}
                                    {column.description && (
                                        <Tooltip description={column?.description} position={TooltipPosition.DOWN}>
                                            <Icon style={{ opacity: "0.3" }} src={info_logo} />
                                        </Tooltip>
                                    )}
                                </span>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading || !data ? (
                        <>
                            {[0, 1, 2, 3, 4, 5]?.map((item) => (
                                <AccountSparkAllocationsRowLoader key={item} />
                            ))}
                        </>
                    ) : (
                        <>
                            {data?.stakes instanceof Array &&
                                data?.stakes?.map((stake, index) => (
                                    <AccountSparkAllocationsRow
                                        data={stake}
                                        key={index}
                                        expand={expand}
                                        setExpand={setExpand}
                                        columns={columns}
                                    />
                                ))}
                        </>
                    )}
                </TableBody>
            </Table>
            {!!data?.total && (
                <Pagination
                    theme="purple"
                    onPageChange={(page: number) => {
                        setCurrentPage(page);
                    }}
                    className="my-15"
                    currentPage={currentPage}
                    totalCount={data?.total}
                    pageSize={10}
                />
            )}
        </div>
    );
};
AccountSparkAllocationsList.defaultProps = {};
export default AccountSparkAllocationsList;
