import { FC } from "react";
import { ProjectBox, ProjectBoxLoader } from "components/project-box";

import "./ProjectOverviewList.scss";
import useIDOPredictionPools from "graphql/hooks/useIDOPredictionPools";
const ProjectOverviewList: FC = () => {
    const { data, isLoading } = useIDOPredictionPools(0, 4);

    return (
        <div className="project-overview-list row">
            {isLoading || !data ? (
                <>
                    {[0, 1, 2, 3]?.map((item) => (
                        <div className="col-md-6" key={item}>
                            <ProjectBoxLoader />
                        </div>
                    ))}
                </>
            ) : (
                <>
                    {data?.pools instanceof Array &&
                        data?.pools?.map((project, index) => (
                            <div className="col-md-6" key={project.id || index}>
                                <ProjectBox data={project} />
                            </div>
                        ))}
                </>
            )}
        </div>
    );
};
ProjectOverviewList.defaultProps = {};
export default ProjectOverviewList;
