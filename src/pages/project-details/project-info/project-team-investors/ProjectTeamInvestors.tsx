import { PredictionPool } from "models";
import { FC } from "react";
import "./ProjectTeamInvestors.scss";

export interface ProjectTeamInvestorsProps {
    data: PredictionPool;
}
const ProjectTeamInvestors: FC<ProjectTeamInvestorsProps> = ({ data }: ProjectTeamInvestorsProps) => {
    const { teamAndInvestors } = data;
    return <div className="project-team-investors" dangerouslySetInnerHTML={{ __html: teamAndInvestors }} />;
};
ProjectTeamInvestors.defaultProps = {};
export default ProjectTeamInvestors;
