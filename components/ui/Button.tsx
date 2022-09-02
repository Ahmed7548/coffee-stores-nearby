import Link from "next/link";
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import JSXStyle from "styled-jsx/style";
import styles from "../../styles/Button.module.css";

type Props= {
	as?: (React.ElementType<any> & keyof JSX.IntrinsicElements);
	children: React.ReactNode;
	href?: string;
} &
	React.DetailedHTMLProps<
React.HTMLAttributes<any>,any
>

const Button=({
	as:element,
	children,
	className,
	href,
	...props
}:Props) => {

	
	if (element && element!=="button" && element!=="a") {
		const Element = React.createElement(element,{...props,className,href},children)
		return Element
	}

	if (element === "a") {
			return (
		<Link href={href ? href : "#"}>
			<a className={`${styles.button} button ${className}`} target="_blank" {...props as React.DetailedHTMLProps<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
>}>
				{children}
			</a>
		</Link>
	);
	}
	


		
		return (
			<button  className={`${styles.button} button ${className}`}  {...props as 	React.DetailedHTMLProps<
				ButtonHTMLAttributes<HTMLButtonElement>,
				HTMLButtonElement
				>}>
				{children}
			</button>
		)
	

};

export default Button;
