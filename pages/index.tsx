import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Card from "../components/ui/Card";
import styles from "../styles/Home.module.css";
import { ImagesFromApi, StoresFromApi } from "../index";
import { storesData, stringSeperator } from "../lib/coffee-store";
import { Store } from "../";
import ConstructFetchRequest from "../lib/ConstructFetchReques";
import useGeoLocation from "../hooks/useGeoLocation";
import { toast } from "react-toastify";
import StoreContext from "../store/store-context";
import { ACTION_TYPES } from "../store/StoreProvider";

interface Props {
	stores: Store[];
}

const Home: NextPage<Props> = ({ stores }) => {
	const [imgWidth, setImageWidth] = useState<number>();

	const { getGeoLocation } = useGeoLocation();

	const { state, dispatch } = useContext(StoreContext);

	const [buttonText, setButtonText] = useState<
		"Discover Coffee Nearby" | "..Loading"
	>("Discover Coffee Nearby");

	useEffect(() => {
		const style = getComputedStyle(document.body);
		setImageWidth(parseInt(style.getPropertyValue("--grid-column-width")));
	}, []);

	const getLocationButtonClickHandler = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		setButtonText("..Loading");
		try {
			const latlng = await getGeoLocation.promise();
			const ll = `${latlng.lat},${latlng.lng}`;

			
			const response = await fetch(`/api/stores?limit=${20}&latlng=${ll}`);
			if (!response.ok) {
				const data = await response.json();
				toast.error(data.message);
				setButtonText("Discover Coffee Nearby");
				return;
			}

			const stores: Store[] = await response.json();
			setButtonText("Discover Coffee Nearby");
			dispatch({ type: ACTION_TYPES.SET_STORES_NEARBY, payload: stores });
		} catch (err: any) {
			if (err) {
				if (err.err) {
					toast.error(err.err);
				}
			} else {
				toast.error("something went wrong");
			}
			setButtonText("Discover Coffee Nearby");
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Coffee Chase</title>
			</Head>
			<main className={styles.main}>
				<header>
					<Banner
						buttonText={buttonText}
						onButtonClick={getLocationButtonClickHandler}
					/>
					<div className={styles["hero-image"]}>
						<Image
							src="/static/undraw_getting_coffee_re_f2do.svg"
							alt="hero image"
							width={600}
							height={500}
						/>
					</div>
				</header>

				{state.coffeeStores.length > 0 && (
					<>
						<div className="glass head">
							<h1 className={styles["grid-header"]}>Coffee Stores Nearby</h1>
						</div>
						<div className="grid">
							{state.coffeeStores.map((store) => (
								<Link
									key={store.id}
									href={`/coffee-store/${store.id}${stringSeperator}${store.imgId}`}
								>
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
					</>
				)}

				<div className="glass head">
					<h1 className={styles["grid-header"]}>Cairo Coffee</h1>
				</div>
				<div className="grid">
					{stores.map((store) => (
						<Link
							key={store.id}
							href={`/coffee-store/${store.id}${stringSeperator}${store.imgId}`}
						>
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
		const data = await storesData.fetchData<
			{
				stores: Store[];
			},
			GetStaticPropsResult<{ stores: Store[] }>
		>((storeResults: StoresFromApi, imageResults: ImagesFromApi) => {
			const modifiedStores = storeResults.results.map((store, ind) => {
				return {
					id: store.fsq_id,
					name: store.name,
					imgUrl: imageResults.results[ind].urls.small,
					imgId: imageResults.results[ind].id,
				};
			});
			return {
				stores: modifiedStores,
			};
		});

		return data;
	} catch (err) {
		console.error(err);
		return {
			notFound: true,
		};
	}
};

export default Home;
