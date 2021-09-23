import {
	cloneElement,
	useState,
	Children,
	useRef,
	useMemo,
	FC,
} from "react";
import MenuButton from "./MenuButton";
import MenuItem from "./MenuItem";
import MenuItems from "./MenuItems";

const MenuComponent: FC<{
	className?: string;
}> = ({ children, className = "" }) => {
	const [isOpen, setIsOpen] = useState(false);

	const buttonRef = useRef<HTMLButtonElement>(null);

	const handleMenu = () => setIsOpen((prev) => !prev);

	const handleClose = (isFocus = true) => {
		setIsOpen(false);
		isFocus && buttonRef.current && buttonRef.current.focus();
	};

	const clone = useMemo(
		() =>
			Children.map(children, (child) => {
				if (
					child &&
					typeof child === "object" &&
					"type" in child
				) {
					return child.type === MenuButton
						? cloneElement(child, {
								isOpen,
								handleMenu,
								ref: buttonRef,
						  })
						: child.type === MenuItems
						? isOpen &&
						  cloneElement(child, { handleClose })
						: child;
				}
				return child;
			}),
		[children, isOpen]
	);
	return <div className={className}>{clone}</div>;
};

const Menu = Object.assign(MenuComponent, {
	Button: MenuButton,
	Items: MenuItems,
	Item: MenuItem,
});

export default Menu;
