import { FC } from "react";
import usePrices from "services/usePrices";

import "./TotemPrice.scss";

const TotemPrice: FC = () => {
    const { totmPrice } = usePrices();
    return <div className="totem-price">1 SPKS: ${totmPrice}</div>;
};
TotemPrice.defaultProps = {};
export default TotemPrice;
