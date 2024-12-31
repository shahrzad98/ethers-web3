import { FC } from "react";
import { useWebWallet } from "hooks/use-web-wallet/useWebWallet";
import { useGlobalDispatch } from "states/globalContext";
import { Icon } from "components/icon";
import "./AccountDetails.scss";
import { useSparksToken } from "services/useSparksToken";
import { useQuery } from "react-query";
import logo from "assets/icons/svgs/spark_white.svg";
import { formatNumberWithCommas } from "utils/number";

const AccountDetails: FC = () => {
    const { active, account } = useWebWallet();
    const sparksToken = useSparksToken();
    const { data: balance } = useQuery(["sparks-token-balance", account], () => sparksToken.getBalance(account), {
        enabled: !!sparksToken.contract,
    });

    const globalDispatch = useGlobalDispatch();
    const accountAddress =
        account && account?.length
            ? `${account.substr(0, 5)}...${account.substr(account.length - 4, account.length - 1)}`
            : null;
    return active ? (
        <div className="account-details" onClick={() => globalDispatch({ type: "toggleWalletOptions" })}>
            <div className="account-details-balance">
                <Icon src={logo} style={{ width: 12 }} /> {formatNumberWithCommas(balance)}
            </div>
            <div className="account-details-address">
                {accountAddress} <span></span>
            </div>
        </div>
    ) : null;
};
AccountDetails.defaultProps = {};
export default AccountDetails;
