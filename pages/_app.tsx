import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/LayOut";
import Footer from "../components/layout/Footer";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import StoreProvider from "../store/StoreProvider";
import {SWRConfig} from "swr"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<StoreProvider>
				<SWRConfig value={{
					refreshInterval: 2000,
					fetcher:(url,init)=>fetch(url,init).then(res=>res.json())
				}}>
			<Component {...pageProps} />
				</SWRConfig>
			</StoreProvider>
			<Footer />
			<ToastContainer
				position="top-left"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</Layout>
	);
}

export default MyApp;
