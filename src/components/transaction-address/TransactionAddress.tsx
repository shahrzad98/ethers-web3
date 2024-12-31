import { FC } from "react";
import "./TransactionAddress.scss";
import { Icon } from "components/icon";
import open_logo from "assets/icons/svgs/open.svg";
interface TransactionAddressProps {
    address: string;
    transactionEndpoint?: string;
}

const TransactionAddress: FC<TransactionAddressProps> = ({ address, transactionEndpoint }: TransactionAddressProps) => {
    return (
        <a
            className="ui-transaction-address"
            href={`${transactionEndpoint}/${address}`}
            target="_blank"
            rel="noreferrer"
        >
            <span className="ui-transaction-address-value">{address}</span>
            <Icon src={open_logo} />
        </a>
    );
};

export default TransactionAddress;
