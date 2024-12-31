import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./Icon.scss";
import ido_logo from "assets/icons/svgs/spark.svg";
interface IconProps {
    src: string;
    alt?: string;
    link?: string;
    target?: string;
    className?: string;
    style?: any;
}
const onImageError = (ev: any) => {
    ev.target.src = ido_logo;
};
const Icon: FC<IconProps> = ({ src, alt, link = "", target = "", className = "", style }: IconProps) => {
    return link ? (
        target === "_blank" ? (
            <a className={`ui-icon ${className && className}`} href={"/" + link} target={target}>
                <img alt={alt} src={src} style={style} onError={onImageError} />
            </a>
        ) : (
            <NavLink
                to={link}
                replace={false}
                className={`ui-icon ${className ? className : ""}`}
                target={target}
                activeClassName="active"
            >
                <img alt={alt} src={src} style={style} onError={onImageError} />
            </NavLink>
        )
    ) : (
        <span className={`ui-icon ${className ? className : ""}`}>
            <img alt={alt} src={src} style={style} onError={onImageError} />
        </span>
    );
};

export default Icon;
