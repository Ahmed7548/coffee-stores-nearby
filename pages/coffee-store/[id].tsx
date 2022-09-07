import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import styles from "../../styles/CoffeeStore.module.css";
import Button from "../../components/ui/Button";
import { useRouter } from "next/router";
import Loading from "../../components/ui/Loading";
import { GoLocation } from "react-icons/go";
import { BsHouseDoor } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import useDebounce from "../../hooks/useDebounce";
import { storesDataPaths, stringSeperator } from "../../lib/coffee-store";
import { ImagesFromApi, StoresFromApi } from "../..";
import ConstructFetchRequest from "../../lib/ConstructFetchReques";
import { toast } from "react-toastify";
import Coffe_Store from "../../models/Coffee-store";
import useStore from "../../hooks/swr/useVotes";


interface Props {
	id: string;
	name: string;
	imgUrl: string;
	websiteUrl: string;
	address: string;
	neighbourhood: string;
}
const CoffeeStore = ({
	address,
	id,
	imgUrl,
	name,
	neighbourhood,
	websiteUrl,
}: Props) => {

	const [upvotes, setupvotes] = useState<number>(0);
	const router = useRouter();

	const updatePrevVotes = useCallback((value:number) => {
		prevVotes.current=value
	}, [])

	const prevVotes= useRef(0)

	const { mutate } = useStore(id, setupvotes,updatePrevVotes);


	//update upvotes on the post
	const updateResource = useCallback(
		(votes: number) => {
			const upvote = async () => {
				try {
					if (votes - prevVotes.current === 0) {
						return
					}
					const res = await fetch(`http://localhost:3000/api/upvote/${id}`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							votes: votes-prevVotes.current,
						}),
					});

					if (!res.ok) {
						toast.error("couldn't add your upvotes");
						console.log(res)
					} else {
						console.log("in the use debounce callback", votes);
					}
				} catch (err) {
					toast.error("couldn't add your upvotes");
					console.log(err)

				}
			};

			mutate(upvote(), {
				rollbackOnError: true,
				populateCache: true,
				revalidate: true,
			});
		},
		[id,mutate]
	);
	useDebounce<number>(upvotes, 300, updateResource);

	const upVote = () => {
		setupvotes((prev) => prev + 1);
	};

	if (router.isFallback) {
		return <Loading />;
	}
	return (
		<div className="center-container">
			<div>
				<Link href="/">
					<a className="link">←back to home </a>
				</Link>
			</div>
			<div className={styles.container}>
				<div className={styles.left}>
					<h2>{name}</h2>
					<div className={styles.img}>
						<Image alt="" src={imgUrl} width={650} height={360} />
					</div>
				</div>
				<div className={`${styles.right} glass`}>
					<h3>{name}</h3>
					<div className={styles.address}>
						<address>
							<span>
								<BsHouseDoor />
							</span>
							{neighbourhood}
						</address>
						<address>
							<span>
								<GoLocation />
							</span>{" "}
							{address}
						</address>
					</div>
					<div className={styles.votes}>
						<div>
							<small>{upvotes}</small>
							<span>
								<AiOutlineLike className={styles.like} />
							</span>
						</div>
						<Button className={styles.upvote} onClick={upVote}>
							upvote
						</Button>
					</div>
					<Button as={"a"} href={websiteUrl}>
						{" "}
						visit their web site
					</Button>
				</div>
			</div>
		</div>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const data = await storesDataPaths.fetchData<{
		stores: { id: string; imgId: string }[];
	}>((storeResults: StoresFromApi, imageResults: ImagesFromApi) => {
		{
			const modifiedStores = storeResults.results.map((store, ind) => {
				return {
					id: store.fsq_id,
					imgId: imageResults.results[ind].id,
				};
			});
			return {
				stores: modifiedStores,
			};
		}
	});

	if (data.notFound) {
		return {
			paths: [],
			fallback: true,
		};
	}

	if (data.props) {
		// storesDataPaths.cashData(data.props.stores);

		const paths = data.props.stores.map((store) => ({
			params: { id: `${store.id}${stringSeperator}${store.imgId}` },
		}));

		return {
			paths,
			fallback: true,
		};
	}
	return {
		paths: [],
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<
	any,
	{ id: string },
	{ imgId: string }
> = async (context) => {
	try {
		const [id, imgId] = context.params?.id.split(stringSeperator) as [
			string,
			string
		];

		const placeRequest = new ConstructFetchRequest(
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: process.env.API_KEY as string,
				},
			},
			{
				baseUrl: `https://api.foursquare.com/v3/places/${id}`,
			}
		);

		const unsplashRequest = new ConstructFetchRequest(
			{},
			{
				baseUrl: `https://api.unsplash.com/photos/${imgId}`,
				client_id: process.env.UNSPLASH_KEY,
			}
		);

		const data = await storesDataPaths.fetchData<any>(
			(storeResults, imageResults) => {
				return {
					id: storeResults.fsq_id,
					name: storeResults.name,
					imgUrl: imageResults.urls.regular,
					websiteUrl: storeResults.link || "",
					address: storeResults.location.formatted_address || "",
					neighbourhood:
						storeResults.location.locality ||
						storeResults.location.cross_street ||
						"",
					upvotes: 10,
				};
			},
			placeRequest,
			unsplashRequest
		);

		await Coffe_Store.updateOne(
			{ forSquareId: id },
			{
				$inc: {
					votes: 0,
				},
			},
			{
				upsert: true,
			}
		);

		return data;
	} catch (err) {
		console.error("error fetching data", err);
		return {
			notFound: true,
		};
	}
};

export default CoffeeStore;
