import { QueryOptions } from "..";

class ConstructFetchRequest {
	constructor(
		private fetchOptions: RequestInit,
		private queryOptions: QueryOptions
	) {}

	constructFetch(): Promise<Response> {
		return fetch(
			ConstructFetchRequest.constructURL(this.queryOptions).href,
			this.fetchOptions
		);
	}

	static constructURL({ baseUrl, ...options }: QueryOptions): URL {
		const url = new URL(baseUrl);
		let key: keyof typeof options;
		for (key in options) {
			const value = options[key];
			if (typeof value !== "undefined") {
				url.searchParams.append(key, value.toString());
			}
		}

		return url;
	}
}

export default ConstructFetchRequest;
