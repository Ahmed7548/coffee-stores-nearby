import Link from "next/link";
import { type } from "os";
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import styles from "../../styles/Button.module.css";

type Props = {
	as?: "a" | "button";
	children: React.ReactNode;
	href?: string;
} & React.DetailedHTMLProps<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
> &
	React.DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>;

const Button: React.FC<Props> = ({
	as,
	children,
	href,
	className,
	...props
}) => {
	let Element: (React.ElementType<any> | "a" | "button") | undefined = as;
	if (Element === undefined) Element = "button";

	if (Element === "button") {
		return (
			<button className={`${styles.button} .button ${className}`} target="_blank" {...props}>
				{children}
			</button>
		)
	}

	
	return (
		<Link href={href ? href : "#"}>
			<a className={`${styles.button} .button ${className}`} target="_blank" {...props}>
				{children}
			</a>
		</Link>
	);
};

export default Button;
