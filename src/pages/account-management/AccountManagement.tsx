/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react";
import { Tabs, Tab, TabPanel } from "@totemfi/ui-components";
import { ConnectWallet } from "components/header/connect-wallet";
import "./AccountManagement.scss";
import { AccountSpark } from "./account-spark";

const AccountManagement: FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (event: any, value: any) => {
        setSelectedTab(value);
    };

    return (
        <ConnectWallet type="popup">
            <div className="account-management">
                <Tabs hasBorder={true} value={selectedTab} onChange={handleChange}>
                    {/* <Tab>Predictions</Tab> */}
                    <Tab>Spark</Tab>
                </Tabs>
                {/* <TabPanel value={selectedTab} index={0}>
                            <AccountPredictorRewardsList />
                        </TabPanel> */}
                <TabPanel value={selectedTab} index={0}>
                    <AccountSpark />
                </TabPanel>
            </div>
        </ConnectWallet>
    );
};
AccountManagement.defaultProps = {};
export default AccountManagement;
