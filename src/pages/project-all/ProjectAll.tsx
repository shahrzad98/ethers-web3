import { FC } from "react";
import { ProjectAllList } from "./project-all-list";
import { useHistory } from "react-router-dom";
import { Button, ButtonForm } from "@totemfi/ui-components";
import { Helmet } from "react-helmet";
import "./ProjectAll.scss";

const ProjectAll: FC = () => {
    const history = useHistory();
    return (
        <div className="project-all">
            <Helmet>
                <title>Spark - Project All </title>
                <meta name="description" content="Spark - Project All" />
            </Helmet>
            <Button
                buttonForm={ButtonForm.SECONDARY_HIGH}
                onClick={() => {
                    history.goBack();
                }}
            >
                Back To Overview
            </Button>

            <ProjectAllList />
        </div>
    );
};

export default ProjectAll;
