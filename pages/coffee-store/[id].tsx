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
import { fetchCoffeeStores, fetchStore } from "../../lib/coffee-store";

interface Props {
	id: number;
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
	const [loadingVotes, setLoadingVotes] = useState<boolean>(true);
	const prevVotes = useRef<number>(0);
	const router = useRouter();

	const updateResource = useCallback(
		async (votes: number) => {
			try {
				const res = await fetch(`http://localhost:5000/stores/${id}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						upvotes: votes,
					}),
				});
				if (!res.ok) {
					setupvotes(prevVotes.current);
				} else {
					prevVotes.current = votes;
				}
			} catch (err) {
				setupvotes(prevVotes.current);
			}
		},
		[id]
	);

	useDebounce<number>(upvotes, 500, updateResource);

	useEffect(() => {
		setLoadingVotes(true);
		fetch(`http://localhost:5000/stores/${id}`)
			.then((res) => {
				return res.json();
			})
			.then((res: { upvotes: number }) => {
				setupvotes(res.upvotes);
				setLoadingVotes(false);
				prevVotes.current = res.upvotes;
			})
			.catch((_) => setupvotes(prevVotes.current));
	}, [id]);

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
					<a className="link">back to home </a>
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
	const data = await fetchCoffeeStores({
		baseUrl: "https://api.foursquare.com/v3/places/search",
		query: "coffee shop",
		fields: "fsq_id",
		limit: 10,
		near: "cairo",
	});

	if (data.notFound) {
		return {
			paths: [],
			fallback: true,
		};
	}

	if (data.props) {
		const paths = data.props.stores.map((store) => ({
			params: { id: `${store.id}` },
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

export const getStaticProps: GetStaticProps<any, { id: string }> = async (
	context
) => {
	try {
		const data = await fetchStore({
			baseUrl: `https://api.foursquare.com/v3/places/${context.params?.id}`,
			fields: "fsq_id,categories,location,name,link",
		});

		if (data.notFound) {
			return {
				notFound: true,
			};
		}

		if (data.props) {
			return {
				props: data.props,
			};
		}
		return {
			notFound: true,
		};
	} catch {
		return {
			notFound: true,
		};
	}
};

export default CoffeeStore;
