import "./AccountSummaryBalanceBox.scss";

import ContentLoader from "react-content-loader";

interface AccountSummaryBalanceBoxProps {
    loading: boolean;
    chart: any;
    totalBalance: any;
    availableBalance: any;
    stakedBalance: any;
}
const AccountSummaryBalanceBox = ({
    loading,
    chart,
    totalBalance,
    availableBalance,
    stakedBalance,
}: AccountSummaryBalanceBoxProps) => {
    return (
        <div className="account-summary-balance-box  ">
            <div className="row">
                <div className=" account-summary-balance-box-chart  col-xs-3 col-xxs-4">
                    {loading || !availableBalance || !stakedBalance ? (
                        <ContentLoader
                            animate={true}
                            speed={2}
                            width={100}
                            height={100}
                            viewBox="0 0 400 160"
                            backgroundColor="#737373"
                            foregroundColor="#414244"
                        >
                            <circle cx="100" cy="80" r="80" />
                        </ContentLoader>
                    ) : (
                        <>{chart}</>
                    )}
                </div>
                <div className="account-summary-balance-box-balance col-xs-9 col-xxs-8">
                    <div className="account-summary-balance-box-balance-total">
                        <div className="account-summary-balance-box-balance-total-label">Total Wallet Balance</div>
                    </div>
                    <div className="account-summary-balance-box-balance-total">
                        <div className="account-summary-balance-box-balance-total-value">
                            {loading || !availableBalance || !stakedBalance ? (
                                <ContentLoader
                                    animate={true}
                                    speed={2}
                                    width={70}
                                    height={6}
                                    viewBox="0 0 70 6"
                                    backgroundColor="#737373"
                                    foregroundColor="#414244"
                                >
                                    <rect x="5" y="0" rx="3" ry="3" width="70" height="6" />
                                </ContentLoader>
                            ) : (
                                <>{totalBalance}</>
                            )}
                        </div>
                    </div>
                    <div className="account-summary-balance-box-balance-details">
                        <div className="account-summary-balance-box-balance-details-available">
                            <div className="account-summary-balance-box-balance-details-available-label">
                                <div className="account-summary-balance-box-balance-details-available-label-value">
                                    {loading ? (
                                        <ContentLoader
                                            animate={true}
                                            speed={2}
                                            width={70}
                                            height={6}
                                            viewBox="0 0 70 6"
                                            backgroundColor="#737373"
                                            foregroundColor="#414244"
                                        >
                                            <rect x="5" y="0" rx="3" ry="3" width="70" height="6" />
                                        </ContentLoader>
                                    ) : (
                                        <>{availableBalance}</>
                                    )}
                                </div>
                                Available
                            </div>
                        </div>
                        <div className="account-summary-balance-box-balance-details-staked">
                            <div className="account-summary-balance-box-balance-details-staked-label">
                                <div className="account-summary-balance-box-balance-details-staked-label-value">
                                    {!stakedBalance || loading ? (
                                        <ContentLoader
                                            animate={true}
                                            speed={2}
                                            width={70}
                                            height={6}
                                            viewBox="0 0 70 6"
                                            backgroundColor="#737373"
                                            foregroundColor="#414244"
                                        >
                                            <rect x="5" y="0" rx="3" ry="3" width="70" height="6" />
                                        </ContentLoader>
                                    ) : (
                                        <>{stakedBalance}</>
                                    )}
                                </div>
                                Staked
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
AccountSummaryBalanceBox.defaultProps = {};
export default AccountSummaryBalanceBox;
