import { PredictionPool } from "models";
import { FC } from "react";
import "./ProjectRoadmap.scss";
export interface ProjectRoadmapProps {
    data: PredictionPool;
}
const ProjectRoadmap: FC<ProjectRoadmapProps> = ({ data }: ProjectRoadmapProps) => {
    const { roadMap } = data;
    return <div className="project-roadmap" dangerouslySetInnerHTML={{ __html: roadMap }} />;
};
ProjectRoadmap.defaultProps = {};
export default ProjectRoadmap;
