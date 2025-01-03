/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, memo, useEffect } from "react";
import { useWebWallet, getErrorMessage, connectorsByName, ConnectorNames } from "hooks/use-web-wallet/useWebWallet";

import "./WalletOptions.scss";
import { Icon } from "components/icon";
import Metamask from "assets/icons/svgs/metamask.svg";
import Fortmatic from "assets/icons/pngs/fortmatic.png";
import Portis from "assets/icons/pngs/portis.png";
import Torus from "assets/icons/pngs/torus.png";
import WalletLink from "assets/icons/pngs/walletLink.png";
import WalletConnect from "assets/icons/pngs/walletConnect.png";
import Frame from "assets/icons/svgs/metamask.svg";

import useNotification from "hooks/useNotification";
import { useGlobalDispatch } from "states/globalContext";

const WalletOptions: FC = () => {
    const { active, error, setActivatingConnector, activate, deactivate, triedEager, activatingConnector, connector } =
        useWebWallet();
    const notification = useNotification();
    const globalDispatch = useGlobalDispatch();

    // const blockNumber = wallet && wallet.getBlockNumber();

    const options: any[] = [
        // { key: undefined, value: "MetaMask", icon: Metamask },
        // { connector: connectorsByName[ConnectorNames.Network], value: "Network", icon: Metamask },
        { connector: connectorsByName[ConnectorNames.Injected], value: "MetaMask", icon: Metamask },
        // { connector: connectorsByName[ConnectorNames.Frame], value: "Frame", icon: Frame },
        // { connector: connectorsByName[ConnectorNames.Portis], value: "Portis", icon: Portis },
        // { connector: connectorsByName[ConnectorNames.Fortmatic], value: "Fortmatic", icon: Fortmatic },
        { connector: connectorsByName[ConnectorNames.Torus], value: "Torus", icon: Torus },
        { connector: connectorsByName[ConnectorNames.WalletConnect], value: "WalletConnect", icon: WalletConnect },
        { connector: connectorsByName[ConnectorNames.WalletLink], value: "WalletLink", icon: WalletLink },
    ];

    const handleActive = (_connector: any) => {
        if (connector === _connector) {
            (connector as any).close();
        } else {
            setActivatingConnector(_connector);
            activate(_connector).then(() => {
                window.localStorage.removeItem("USER_DISCONNECTED_WALLET");
                globalDispatch({ type: "setWalletOptions", value: false });
            });
        }
    };
    const handleDeActive = (_connector: any) => {
        window.localStorage.setItem("USER_DISCONNECTED_WALLET", "true");
        deactivate();
        globalDispatch({ type: "setWalletOptions", value: false });
    };

    useEffect(() => {
        error && notification.error(getErrorMessage(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
        <div className="wallet-options">
            <div className="wallet-options-list">
                {options?.map((option) => {
                    const currentConnector = option.connector;
                    const activating = currentConnector === activatingConnector;
                    const connected = currentConnector === connector;
                    const disabled = !triedEager || !!activatingConnector || connected || !!error;
                    return (
                        <button
                            style={{
                                border: activating ? "2px solid orange" : connected ? " 2px solid green" : "unset",
                                cursor: disabled ? "unset" : "pointer",
                            }}
                            key={option.value}
                            disabled={disabled}
                            onClick={() => handleActive(option.connector)}
                        >
                            {option.value}
                            <Icon alt={"alt"} src={option.icon} />
                        </button>
                    );
                })}
                {(active || error) && <button onClick={handleDeActive}>Deactivate</button>}
            </div>
            {error && <h4 className="wallet-options-errors">{getErrorMessage(error)}</h4>}
        </div>
    );
};
WalletOptions.defaultProps = {};
export default memo(WalletOptions);
