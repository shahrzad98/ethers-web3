/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react";
import { ProjectRoadmap } from "./project-roadmap";
import { ProjectTeamInvestors } from "./project-team-investors";
import { ProjectTokenomics } from "./project-tokenomics";
import { Tabs, Tab, TabPanel, Paper } from "@totemfi/ui-components";

import "./ProjectInfo.scss";
import { PredictionPool } from "models";
export interface ProjectInfoProps {
    data: PredictionPool;
    isLoading: boolean;
}
const ProjectInfo: FC<ProjectInfoProps> = ({ data }: ProjectInfoProps) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (event: any, value: any) => {
        setSelectedTab(value);
    };
    return (
        <div className="project-info row box">
            <Paper>
                <Tabs hasBorder value={selectedTab} onChange={handleChange}>
                    <Tab>Tokenomics</Tab>
                    <Tab>Roadmap</Tab>
                    <Tab>Team & Investors</Tab>
                </Tabs>
                <TabPanel value={selectedTab} index={0}>
                    <ProjectTokenomics data={data || {}} />
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    <ProjectRoadmap data={data || {}} />
                </TabPanel>
                <TabPanel value={selectedTab} index={2}>
                    <ProjectTeamInvestors data={data || {}} />
                </TabPanel>
            </Paper>
        </div>
    );
};
ProjectInfo.defaultProps = {};
export default ProjectInfo;
