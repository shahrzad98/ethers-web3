import { FC } from "react";
import { TotemPrice } from "./totem-price";
import { AccountDetails } from "./account-details";
import { ConnectWallet } from "./connect-wallet";
import { WalletOptions } from "components/wallet-options";
import { Modal } from "@totemfi/ui-components";
import { Menu, MenuItem } from "components/menu";
import { useGlobalState, useGlobalDispatch } from "states/globalContext";
// import { ThemeSelector } from "./theme-selector";
import "./Header.scss";

const items: MenuItem[] = [
    { label: "TotemFi Website", link: "https://totemfi.com/" },
    { label: "Whitepaper", link: "https://drive.google.com/file/d/1b-R4gSghyeGQdh0ynMjHEsZ62iXDI8qm/view" },
    { label: "FAQ", link: "https://totemfi.com/" },
];
const Header: FC = () => {
    const { walletOptions } = useGlobalState();
    const globalDispatch = useGlobalDispatch();
    return (
        <div className="header">
            <TotemPrice />

            <ConnectWallet theme="purple">
                <AccountDetails />
            </ConnectWallet>

            <Menu items={items} />

            <Modal
                title="Connect Wallet :"
                open={walletOptions}
                width="30"
                maxHeight="620"
                onClose={() => globalDispatch({ type: "setWalletOptions", value: false })}
            >
                <WalletOptions />
            </Modal>

            {/* <ThemeSelector /> */}
        </div>
    );
};
Header.defaultProps = {};
export default Header;
