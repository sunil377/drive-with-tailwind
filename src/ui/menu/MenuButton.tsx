import { FC, forwardRef, Ref } from "react";

const MenuButton: Props = forwardRef(
	(
		{
			isOpen = false,
			className = "",
			children,
			handleMenu = () => {},
		},
		ref: Ref<HTMLButtonElement>
	) => {
		return (
			<button
				className={className}
				onClick={handleMenu}
				aria-haspopup="true"
				aria-controls="dropdownMenu"
				aria-expanded={isOpen}
				ref={ref}
				id="menuButton"
			>
				{children}
			</button>
		);
	}
);

export default MenuButton;

type Props = FC<{
	isOpen?: boolean;
	className?: string;
	handleMenu?: () => void;
}>;
