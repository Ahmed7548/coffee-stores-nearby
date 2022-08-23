import type { GetStaticProps, NextPage } from "next";
import { useEffect,useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Card from "../components/ui/Card";
import styles from "../styles/Home.module.css";

interface Props{
  shops:{}[]
}

const Home: NextPage<Props> = ({shops}) => {

	const [imgWidth, setImageWidth] = useState<number>();

	useEffect(() => {
    const style = getComputedStyle(document.body);
    setImageWidth(parseInt(style.getPropertyValue("--grid-column-width")))
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
        <div className="grid">
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
          <Card title="my favorite coffe store" href="/static/ruben-ramirez-xhKG01FN2uk-unsplash.jpg" imgWidth={imgWidth} id={"1"} />
        </div>
			</main>
		</div>
	);
};


export const getStaticProps:GetStaticProps = () => {
  return {
    props: {
      shops:[]
    }
  }
}


export default Home;
