import { FC } from "react";
import { Icon } from "components/icon";
import telegram_logo from "assets/icons/svgs/telegram.svg";
import twitter_logo from "assets/icons/svgs/twitter.svg";
import discord_logo from "assets/icons/svgs/discord.svg";
import "./Footer.scss";

const Footer: FC = () => {
    return (
        <div className="footer">
            <Icon
                src={telegram_logo}
                link="https://t.me/totemfi"
                target="_blank"
                style={{ width: "28px", height: "28px" }}
            />
            <Icon
                src={twitter_logo}
                link="https://twitter.com/TotemFi"
                target="_blank"
                style={{ width: "28px", height: "28px" }}
            />
            <Icon
                src={discord_logo}
                link="https://discord.com/TotemFi"
                target="_blank"
                style={{ width: "28px", height: "28px" }}
            />
        </div>
    );
};
Footer.defaultProps = {};
export default Footer;
