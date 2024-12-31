import { FC } from "react";
import { Icon } from "components/icon";
import { useHistory } from "react-router-dom";
import account_logo from "assets/icons/svgs/account.svg";
import spark_logo from "assets/icons/svgs/spark.svg";
import "./Sidebar.scss";

const Sidebar: FC = () => {
    const history = useHistory() as any;
    const pathname = history?.location?.pathname;

    const activeSparkLink = pathname.includes("project") || pathname === "/";
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Icon src={spark_logo} link="/project-overview" className={activeSparkLink ? "active" : ""} />
                </li>
                <li>
                    <Icon src={account_logo} link="/account-management" />
                </li>

                {/* <li>
                    <Link to="/example">Example </Link>
                </li> */}
            </ul>
        </div>
    );
};
Sidebar.defaultProps = {};
export default Sidebar;
