import { FC } from "react";
import ContentLoader from "react-content-loader";
import "./ProjectBox.scss";

const ProjectBoxLoader: FC = () => {
    return (
        <div className="project-box box">
            <ContentLoader
                animate={true}
                speed={2}
                width={400}
                height={160}
                viewBox="0 0 400 160"
                backgroundColor="#737373"
                foregroundColor="#414244"
            >
                <circle cx="20" cy="35" r="20" />
                <rect x="48" y="35" rx="3" ry="3" width="52" height="6" />

                <rect x="330" y="25" rx="3" ry="3" width="80" height="25" />

                <rect x="0" y="80" rx="3" ry="3" width="100" height="6" />
                <rect x="0" y="95" rx="3" ry="3" width="40" height="6" />

                <rect x="150" y="80" rx="3" ry="3" width="100" height="6" />
                <rect x="150" y="95" rx="3" ry="3" width="40" height="6" />

                <rect x="300" y="80" rx="3" ry="3" width="100" height="6" />
                <rect x="300" y="95" rx="3" ry="3" width="40" height="6" />

                <rect x="20" y="130" rx="3" ry="3" width="360" height="6" />
                <rect x="160" y="150" rx="3" ry="3" width="80" height="6" />
            </ContentLoader>
        </div>
    );
};
ProjectBoxLoader.defaultProps = {};
export default ProjectBoxLoader;
