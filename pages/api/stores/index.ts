// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Store } from "../../..";
import { placesOptions, transformStoresDataCB } from "../../../lib/coffee-store";
import ConstructFetchRequest from "../../../lib/ConstructFetchReques";
import FetchCoffeeStoreData from "../../../lib/FetchCoffeStoreData";

export default async function storesNearby(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const { limit, latlng } = req.query as { limit: string; latlng: string };
	const dataFetcher = new FetchCoffeeStoreData<Store>(
		new ConstructFetchRequest(placesOptions, {
			baseUrl: "https://api.foursquare.com/v3/places/search",
			limit: limit,
			ll: latlng,
			radius: 100000,
			query: "coffee shop",
		}),
		new ConstructFetchRequest(
			{},
			{
				baseUrl: "https://api.unsplash.com/search/photos/",
				per_page: limit,
				page: 2,
				query: "coffee shop",
				client_id: process.env.UNSPLASH_KEY,
			}
		)
	);

	try {
		const data = await dataFetcher.fetchData(transformStoresDataCB);

		if (data.notFound) {
			res.status(404).json({ message: "no stores were found" });
			return;
		}
		res.status(200).json(data.props?.stores);
	} catch (err) {
		res.status(400).json({ message: "something went wrong" });
	}
}
