import Link from "next/link";
import React, { useLayoutEffect, useRef, useState } from "react";
import styles from "./Card.module.css";
import Image from "next/image";

interface Props {
	imgWidth?: number;
	title: string;
	href: string;
	id: string;
}

const Card = ({ imgWidth, href, title }: Props) => {
	return (
		<div className={`${styles.card} glass`}>
			<h4>{title}</h4>
			<Image
				alt=""
				src={href}
				width={imgWidth ? imgWidth : 300}
				height={(imgWidth ? imgWidth : 300) - 20}
			/>
		</div>
	);
};

export default Card;
