import { useState, FC, useRef, useEffect } from "react";
import { Icon } from "components/icon";
import three_dots from "assets/icons/svgs/three-dots.svg";
import "./Menu.scss";
import { MenuProps } from "./Menu.interface";

const Menu: FC<MenuProps> = ({ items, ...rest }: MenuProps) => {
    const [active, setActive] = useState(false);
    const dropdownMenu = useRef<HTMLInputElement>(null);
    const showMenu = (event: any) => {
        event.preventDefault();
        setActive(true);
    };

    useEffect(() => {
        const closeMenu = (event: any) => {
            if (!dropdownMenu?.current?.contains(event.target)) {
                setActive(false);
                document.removeEventListener("click", closeMenu);
            }
        };
        if (active) {
            return document.addEventListener("click", closeMenu);
        }
    }, [active]);

    return (
        <div className="ui-menu" {...rest}>
            <div tabIndex={0}>
                <div className={`ui-menu-toggle ${active ? "active" : ""}`} onClick={showMenu}>
                    <Icon src={three_dots} />
                </div>
                <div ref={dropdownMenu} className={`ui-menu-list ${active ? "ui-menu-expanded" : "ui-menu-collapsed"}`}>
                    <ul>
                        {items.map((item: any, index: any) => (
                            <li key={index}>
                                <a target="_blank" rel="noopener noreferrer" href={item.link}>
                                    <div className="ui-menu-list-label">{item.label}</div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Menu;
