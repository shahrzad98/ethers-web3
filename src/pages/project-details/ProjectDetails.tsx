/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";
import { ProjectInfo } from "./project-info";
import { ProjectSummary } from "./project-summary";
import { useHistory, useParams } from "react-router-dom";
import { Button, ButtonForm } from "@totemfi/ui-components";
import { Helmet } from "react-helmet";
import useIDOPredictionPoolById from "graphql/hooks/useIDOPredictionPoolById";
import "./ProjectDetails.scss";

const ProjectDetails: FC = () => {
    const params = useParams() as any;
    const { data, isLoading } = useIDOPredictionPoolById(params?.id);
    const history = useHistory();
    return (
        <div className="project-details row">
            <Helmet>
                <title>Spark - Project Details </title>
                <meta name="description" content="Spark - Project Details" />
            </Helmet>
            <Button
                buttonForm={ButtonForm.SECONDARY_HIGH}
                onClick={() => {
                    history.goBack();
                }}
                className="project-details-link"
            >
                Back To List
            </Button>

            <ProjectSummary data={data || {}} isLoading={isLoading} />
            <ProjectInfo data={data || {}} isLoading={isLoading} />
        </div>
    );
};

export default ProjectDetails;
