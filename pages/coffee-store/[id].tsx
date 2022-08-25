import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import styles from "../../styles/CoffeeStore.module.css";
import Button from "../../components/ui/Button";
import { useRouter } from "next/router";
import Loading from "../../components/ui/Loading";

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
  const router = useRouter()


  if (router.isFallback) {
    return (<Loading/>)
  }
	return (
		<div className="center-container">
			<div>
				<Link href="/">
					<a  className="link">back to home </a>
				</Link>
			</div>
			<div className={styles.container}>
        <div className={styles.left}>
          <h2>{name}</h2>
          <Image alt="" src={imgUrl} width={500} height={400} />
				</div>
        <div className={`${styles.right} glass`}>
          <h2>{name}</h2>
          <address>{neighbourhood}</address>
          <address> {address}</address>
          <Button as={"a"} href={websiteUrl}> visit their web site</Button>
          <div className={styles.votes}>
            
          </div>
        </div>
			</div>
		</div>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch("http://localhost:5000/stores");

	const stores: { id: string }[] = await response.json();

	const paths = stores.map((store) => ({ params: { id: `${store.id}` } }));

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async (
	context
) => {
	const response = await fetch(
		`http://localhost:5000/stores/${context.params?.id}`
	);
	const store = await response.json();

  console.log(store)

  if (store.id === undefined  ) {
    return {
      notFound:true
    }
  }

	return {
		props: store,
	};
};

export default CoffeeStore;
