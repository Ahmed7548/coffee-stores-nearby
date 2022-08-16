import Link from "next/link";
import React from "react";
import styles from "../../styles/Button.module.css";

interface Props {
	as?: React.ElementType<any> | "a" | "button";
	children: React.ReactNode;
}

const Button: React.FC<Props> = ({ as, children }) => {
	console.log(as);
	let Element: (React.ElementType<any> | "a" | "button") | undefined = as;
	if (Element === undefined) Element = "button";
	return (
		<Link href="#" className={styles.button}>
			<a  className={styles.button}>{children}</a>
		</Link>
	);
};

export default Button;
