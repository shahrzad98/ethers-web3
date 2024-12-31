import { FC } from "react";
import { Header } from "components/header";
import { Footer } from "components/footer";
import { Sidebar } from "components/sidebar";
import "./Layout.scss";
import { LayoutProps } from "./Layout.interface";

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
    return (
        <div className="layout">
            <Header />

            <div className="layout-main">
                <Sidebar />
                <div className="layout-main-content">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">{children}</div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
Layout.defaultProps = {};
export default Layout;
