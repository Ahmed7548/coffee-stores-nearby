import ConstructFetchRequest from "./ConstructFetchReques";
import { GetStaticPropsResult } from "next";

class FetchCoffeeStoreData<Prop extends { id: string } = any> {
	private requests: ConstructFetchRequest[] = [];
	constructor(...requests: ConstructFetchRequest[]) {
		this.requests = requests;
	}

	async fetchData<T = Prop, R = { props: T | undefined; notFound?: boolean }>(
		transformData: (...reaults: any[]) => T,
		...requests: ConstructFetchRequest[]
	): Promise<
		R extends GetStaticPropsResult<T>
			? GetStaticPropsResult<T>
			: { props?: T; notFound?: boolean }
	> {
		try {
			const responses = await this.fetchInitialData(
				...(requests.length > 0 ? requests : this.requests)
			);

			const results: any[] = [];
			for (let response of responses) {
				if (!response.ok) {
					return Promise.reject(`response in not ok  with status code of ${response.status}`);
				}
				results.push(await response.json());
			}

			return {
				props: transformData(...results),
			};
		} catch (err) {
			console.error(err);
			return Promise.reject(err);
		}
	}

	private fetchInitialData(
		...fetchinstances: ConstructFetchRequest[]
	): Promise<Response[]> {
		return Promise.all(
			fetchinstances.map((fetchinstance) => fetchinstance.constructFetch())
		);
	}
}

export default FetchCoffeeStoreData;
