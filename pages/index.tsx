import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Card from "../components/ui/Card";
import styles from "../styles/Home.module.css";

interface Store {
	id: number;
	name: string;
	imgUrl: string;
}

interface Props {
	stores: Store[];
}

const Home: NextPage<Props> = ({ stores }) => {
	const [imgWidth, setImageWidth] = useState<number>();

	useEffect(() => {
		const style = getComputedStyle(document.body);
		setImageWidth(parseInt(style.getPropertyValue("--grid-column-width")));
	}, []);

	return (
		<div className={styles.container}>
			<Head>
				<title>Coffee Chase</title>
			</Head>
			<main className={styles.main}>
				<header>
					<Banner buttonText="Discover stores nearby!" />
					<div className={styles["hero-image"]}>
						<Image
							src="/static/undraw_getting_coffee_re_f2do.svg"
							alt="hero image"
							width={600}
							height={500}
						/>
					</div>
				</header>
				<h2 className={styles["grid-header"]}>
					toronto stores
				</h2>
				<div className="grid">
					{stores.map((store) => (
						<Link key={store.id} href={`/coffee-store/${store.id}`}>
							<a>
								<Card
									key={store.id}
									title={store.name}
									href={store.imgUrl}
									imgWidth={imgWidth}
									id={`${store.id}`}
								/>
							</a>
						</Link>
					))}
				</div>
			</main>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const response = await fetch("http://localhost:5000/stores");

	const stores = await response.json();

	return {
		props: {
			stores: stores,
		},
	};
};

export default Home;
