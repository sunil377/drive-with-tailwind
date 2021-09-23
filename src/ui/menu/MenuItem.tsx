import { Children, cloneElement, FC } from "react";

const MenuItem: Props = ({
	className,
	children,
	isActive = false,
	onMouseEnter = () => {},
}) => {
	return (
		<li className={className} role="none">
			{Children.map(children, (child) => {
				if (
					child &&
					typeof child === "object" &&
					"type" in child
				) {
					return cloneElement(child, {
						role: "menuitem",
						tabIndex: -1,
						onMouseEnter: onMouseEnter,
					});
				}
			})}
		</li>
	);
};

export default MenuItem;

type Props = FC<{
	className?: string;
	isActive?: boolean;
	ActiveClass?: string;
	onMouseEnter?: () => void;
}>;
