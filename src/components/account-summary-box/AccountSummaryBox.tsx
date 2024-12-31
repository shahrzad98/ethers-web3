import { Tooltip } from "@totemfi/ui-components";
import { Icon } from "components/icon";
import info_logo from "assets/icons/svgs/info.svg";
import "./AccountSummaryBox.scss";

interface LabelValue {
    label?: string;
    tooltipLabel?: string;
    value?: any;
}

interface AccountSummaryBoxProps {
    total: LabelValue;
    pending: LabelValue;
}
const AccountSummaryBox = ({
    total = { label: undefined, value: null, tooltipLabel: undefined },
    pending = { label: undefined, value: null },
}: AccountSummaryBoxProps) => {
    return (
        <div className="account-summary-box ">
            <div className="account-summary-box-total">
                <div className="account-summary-box-total-label">
                    <div className="account-summary-box-total-label-title">{total?.label}</div>
                    {total?.tooltipLabel && (
                        <Tooltip description={total?.tooltipLabel}>
                            <Icon style={{ opacity: "0.3" }} src={info_logo} />
                        </Tooltip>
                    )}
                </div>
            </div>
            <div className="account-summary-box-total">
                <div className="account-summary-box-total-value">{total?.value}</div>
            </div>
            <div className="account-summary-box-pending">
                <div className="account-summary-box-pending-label">
                    <div className="account-summary-box-pending-label-value">{pending?.value}</div>
                    <div className="account-summary-box-pending-label-title">{pending.label}</div>
                </div>
            </div>
        </div>
    );
};
AccountSummaryBox.defaultProps = {};
export default AccountSummaryBox;
