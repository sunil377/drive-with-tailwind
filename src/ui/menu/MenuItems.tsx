import {
	Children,
	cloneElement,
	FC,
	KeyboardEventHandler,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	Fragment,
} from "react";

const MenuItems: Props = ({
	handleClose = () => {},
	className = "",
	children,
}) => {
	const [active, setActive] = useState(0);
	const [length, setLength] = useState(0);
	const [search, setSearch] = useState("");

	const menuRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (!search || !menuRef.current) return;

		const ele = menuRef.current.querySelectorAll(
			"[role='menuitem']"
		);

		Array.from(ele).find(
			(val, index) =>
				val.textContent &&
				val.textContent[0].toUpperCase() === search &&
				setActive(index)
		);
	}, [search, setActive]);

	useEffect(() => {
		if (!menuRef.current) return;

		const ele = menuRef.current.querySelectorAll(
			"[role='menuitem']"
		) as NodeListOf<HTMLLinkElement | HTMLButtonElement>;

		if (ele.length === 0) return;

		Array.from(ele)[active].focus();
	}, [active]);

	const keyPress: KeyboardEventHandler<HTMLUListElement> =
		useCallback(
			(e) => {
				/^key[A-Z]$/i.test(e.code) &&
					setSearch(e.code[e.code.length - 1]);
			},
			[setSearch]
		);

	const keydown: KeyboardEventHandler<HTMLUListElement> =
		useCallback(
			(e) => {
				const find: Record<string, () => boolean | void> = {
					ArrowDown: () =>
						active !== length - 1 &&
						setActive((prev) => prev + 1),
					ArrowUp: () => {
						active !== 0 && setActive((prev) => prev - 1);
					},
					Escape: () => handleClose(),
					Home: () => setActive(0),
					End: () => setActive(length - 1),
					Tab: () => handleClose(false),
				};
				e.code in find && find[e.code]();
			},
			[active, handleClose, length]
		);

	const clone = useMemo(() => {
		const newChildren = Children.map(children, (child) => {
			if (
				child &&
				typeof child === "object" &&
				"type" in child
			) {
				if (child.type === Fragment) {
					return child.props.children;
				}

				return child;
			}
		});

		setLength(Children.count(newChildren));

		return Children.map(newChildren, (val, index) => {
			return cloneElement(val, {
				isActive: index === active,
				onMouseEnter: () => {
					setActive(index);
				},
			});
		});
	}, [children, active]);

	return (
		<ul
			id="dropdownMenu"
			role="menu"
			aria-labelledby="menuButton"
			className={className + " z-10"}
			ref={menuRef}
			onKeyDown={keydown}
			onKeyPress={keyPress}
		>
			{clone}
		</ul>
	);
};
export default MenuItems;

type Props = FC<{
	handleClose?: (arg?: boolean) => void;
	className?: string;
}>;
