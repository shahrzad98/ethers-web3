import { FC } from "react";
import { ProjectOverviewList } from "./project-overview-list";
import { Link } from "react-router-dom";
import { Button, ButtonForm, ButtonWidth } from "@totemfi/ui-components";
import { Icon } from "components/icon";
import logo from "assets/images/logo_moon_dark.png";
import { Helmet } from "react-helmet";
import "./ProjectOverview.scss";

const ProjectOverview: FC = () => {
    return (
        <div className="project-overview ">
            <Helmet>
                <title>Spark - Project Overview </title>
                <meta name="description" content="Spark - Project Overview " />
            </Helmet>
            <div className="project-overview-logo ">
                <Icon src={logo} link="/" />
            </div>

            <ProjectOverviewList />
            <Link to="/project-all" className="project-overview-link">
                <Button
                    buttonForm={ButtonForm.SECONDARY_HIGH}
                    width={ButtonWidth.FIT_PARENT}
                    onClick={() => {
                        return null;
                    }}
                >
                    All launches
                </Button>
            </Link>
        </div>
    );
};

export default ProjectOverview;
