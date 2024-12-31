import { FC, useState } from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    Tooltip,
    TooltipPosition,
    TableBody,
    Pagination,
} from "@totemfi/ui-components";
import { Icon } from "components/icon";
import { ProjectRow, ProjectRowLoader } from "./project-row";
import info_logo from "assets/icons/svgs/info.svg";
import "./ProjectAllList.scss";
import useIDOPredictionPools from "graphql/hooks/useIDOPredictionPools";

const ProjectAllList: FC = () => {
    const columns = [
        { title: "IDO/ICO/IEO", description: null },
        { title: "Total allocation", description: "Total allocation" },
        { title: "Max per wallet", description: "Max per wallet" },
        { title: "IDO price", description: "IDO price" },
        { title: "Price after 24H", description: "Price after 24H" },
        { title: "Time remaining", description: "Time remaining" },
        { title: "Status", description: null },
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useIDOPredictionPools(currentPage - 1, 10);

    return (
        <div className="project-all-list">
            <Table>
                <TableHead>
                    <TableRow>
                        {columns?.map((column, index) => (
                            <TableCell key={column.title || index} component="th">
                                <span>
                                    {column?.title}
                                    {column.description && (
                                        <Tooltip description={column?.description} position={TooltipPosition.DOWN}>
                                            <Icon src={info_logo} />
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
                                <ProjectRowLoader key={item} />
                            ))}
                        </>
                    ) : (
                        <>
                            {data?.pools instanceof Array &&
                                data?.pools?.map((project, index) => (
                                    <ProjectRow data={project} key={project?.id || index} columns={columns} />
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
ProjectAllList.defaultProps = {};
export default ProjectAllList;
