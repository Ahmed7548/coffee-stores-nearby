import Link from "next/link";
import React from "react";
import Button from "./ui/Button";
import styles from "./Banner.module.css";

interface Props {
	className?: string;
	buttonText: string;
	onButtonClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Banner: React.FC<Props> = ({ className, buttonText,onButtonClick }) => {
	return (
		<div className={styles.banner + " " + className}>
			<h1 className={styles.title}>
				<span className="text-white">Coffee</span>{" "}
				<span className={styles.space}>Chase</span>.....
			</h1>
			<p className={styles.description}>Discover your local cofee shops!</p>
			<Button as={"button"}  onClick={onButtonClick}>{buttonText}</Button>
		</div>
	);
};

export default Banner;
