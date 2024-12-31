/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountSummaryBalanceBox } from "components/account-summary-balance-box";
import { AccountSummaryBox } from "components/account-summary-box";
import { Helmet } from "react-helmet";
import { Icon } from "components/icon";
import { Dot } from "components/dot";
import spark_logo from "assets/icons/svgs/spark_white.svg";
import { Currency, CurrencyUnit, Chart, ChartMode } from "@totemfi/ui-components";
import { useSparksToken } from "services/useSparksToken";
import { useQuery } from "react-query";
import useWebWallet from "hooks/use-web-wallet/useWebWallet";
import useSparkUser from "graphql/hooks/useSparkUser";
import "./AccountSparkSummary.scss";
interface AccountSparkSummaryProps {
    data?: any;
}
const AccountSparkSummary = ({ data }: AccountSparkSummaryProps) => {
    const { predictorRewards, predictorPendingRewards, stakingRewards, stakingPendingRewards }: any = {
        predictorRewards: 0,
        predictorPendingRewards: 0,
        stakingRewards: 0,
        stakingPendingRewards: 0,
    };

    const { account } = useWebWallet();

    const sparksToken = useSparksToken();
    const { data: availableBalance, isLoading: availableBalance_loading } = useQuery(
        ["sparks-token-balance", account],
        () => sparksToken.getBalance(account),
        {
            enabled: !!sparksToken.contract,
        },
    );

    const { data: user, isLoading: stakedBalance_loading } = useSparkUser(account || "0", account);
    const stakedBalance = user?.stakedBalance || 0;
    return (
        <>
            <div className="account-spark-summary row box">
                <Helmet>
                    <title>Spark - Account Management </title>
                    <meta name="description" content="Spark - Account Management" />
                </Helmet>

                <div className="col-lg-5 col-xl-4">
                    <AccountSummaryBalanceBox
                        loading={availableBalance_loading || stakedBalance_loading}
                        chart={
                            <Chart
                                size={100}
                                mode={ChartMode.RADIAL}
                                segments={{ "#8618F3": stakedBalance, "#2BEDD8": availableBalance || 0 }}
                                thickness={10}
                            >
                                <Icon src={spark_logo} />
                            </Chart>
                        }
                        totalBalance={
                            <Currency
                                value={stakedBalance + (availableBalance || 0)}
                                unit={CurrencyUnit.SPRK}
                                size="30px"
                            />
                        }
                        stakedBalance={
                            <>
                                <Dot color="#8618F3" />
                                <Currency value={stakedBalance} unit={""} />
                            </>
                        }
                        availableBalance={
                            <>
                                <Dot color="#2BEDD8" />
                                <Currency value={availableBalance || 0} unit={""} />
                            </>
                        }
                    />
                </div>
                <div className="col-xl-8 col-lg-7">
                    <div className="row account-spark-summary-details">
                        <div className="col-md-4 account-spark-summary-box">
                            <AccountSummaryBox
                                total={{
                                    label: "IDO Allocations Won",
                                    value: <Currency value={predictorRewards} size="30px" unit={CurrencyUnit.USD} />,
                                }}
                                pending={{
                                    label: "Pending",
                                    value: <Currency value={predictorPendingRewards} unit={""} />,
                                }}
                            />
                        </div>
                        <div className="col-md-4 account-spark-summary-box">
                            <AccountSummaryBox
                                total={{
                                    label: "Prediction Rewards",
                                    value: <Currency value={predictorRewards} size="30px" unit={CurrencyUnit.SPRK} />,
                                }}
                                pending={{
                                    label: "Pending",
                                    value: <Currency size="16px" value={predictorPendingRewards} unit={""} />,
                                }}
                            />
                        </div>
                        <div className="col-md-4 account-spark-summary-box">
                            <AccountSummaryBox
                                total={{
                                    label: "Staking Rewards",
                                    value: <Currency value={stakingRewards} size="30px" unit={CurrencyUnit.SPRK} />,
                                }}
                                pending={{
                                    label: "Pending",
                                    value: <Currency size="16px" value={stakingPendingRewards} unit={""} />,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountSparkSummary;
