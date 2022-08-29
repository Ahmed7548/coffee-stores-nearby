import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Card from "../components/ui/Card";
import styles from "../styles/Home.module.css";
import { ImageFromApi, ImagesFromApi, StoreFromApi, StoresFromApi } from "../index";
import {storesData,stringSeperator } from "../lib/coffee-store";


interface Store {
	id: string;
	name: string;
	imgUrl: string;
	imgId:string
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
				<h2 className={styles["grid-header"]}>toronto stores</h2>
				<div className="grid">
					{stores.map((store) => (
						<Link key={store.id} href={`/coffee-store/${store.id}${stringSeperator}${store.imgId}`}>
							<a>
								<Card
									key={store.id}
									title={store.name}
									href={store.imgUrl}
									imgWidth={imgWidth}
									id={`${store.id}${stringSeperator}${store.imgId}`}
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

	try {
		const data = await storesData.fetchData <{
			stores: Store[];
		}, GetStaticPropsResult<{ stores: Store[] }>>((storeResults: StoresFromApi, imageResults: ImagesFromApi) => {
			console.log(storeResults)
			const modifiedStores = storeResults.results.map((store, ind) => {
				return {
					id: store.fsq_id,
					name: store.name,
					imgUrl: imageResults.results[ind].urls.small,
					imgId:imageResults.results[ind].id
				};
			});
			return {
				stores: modifiedStores,
			};
		});

		return data
		
	} catch (err) {
		console.log(err);
		return {
			notFound: true,
		};
	}
};

export default Home;
