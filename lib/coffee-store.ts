import { URL } from "url";
import { StoreFromApi } from "..";

interface QueryOptions {
	baseUrl: string;
	query?: string;
	ll?: string;
	near?: string;
	fields?: string;
	limit?: number;
}

type ApiResult<T> =
	| {
			props: T;
	  }
	| {
			notFound: true;
	  };

const constructQueryForApi = ({ baseUrl, ...options }: QueryOptions) => {
	const url = new URL(baseUrl);
	let key: keyof typeof options;
	for (key in options) {
		const value = options[key];
		if (typeof value !== "undefined") {
			url.searchParams.append(key, value.toString());
		}
	}

	return url.href;
};

const fetchData = (queryOptions: QueryOptions) => {
	const options = {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: process.env.API_KEY as string,
		},
	};

	const url = constructQueryForApi(queryOptions);

	return fetch(url, options);
};

export const fetchCoffeeStores = async (queryOptions: QueryOptions) => {
	try {
		const response = await fetchData(queryOptions);

		if (!response.ok) {
			return {
				notFound: true,
			};
		}

		const result: {
			results: StoreFromApi[];
		} = await response.json();

		const stores = result.results;

		const modifiedStores = stores.map((store) => {
			return {
				id: store.fsq_id,
				name: store.name || null,
				imgUrl:
					"https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80",
			};
		});
		return {
			props: {
				stores: modifiedStores,
			},
		};
	} catch {
		return {
			notFound: true,
		};
	}
};

export const fetchStore = async (
	queryOptions: QueryOptions
)=> {
	try {
		const response = await fetchData(queryOptions);

		if (!response.ok) {
			return {
				notFound: true,
			};
		}

		const result: StoreFromApi = await response.json();

		const store = {
			id: result.fsq_id,
			name: result.name,
			imgUrl: "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80",
			websiteUrl: result.link,
			address: result.location.formatted_address,
			neighbourhood: result.location.cross_street,
			upvotes: 10,
		};

		return {
			props: store,
		};
	} catch {
		return {
			notFound: true,
		};
	}
};
