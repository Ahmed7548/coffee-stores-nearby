import ConstructFetchRequest from "./ConstructFetchReques";
import FetchCoffeeStoreData from "./FetchCoffeStoreData";

export const stringSeperator = "nblq2lSeperator";

const placesOptions={
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: process.env.API_KEY as string,
		},
	}

const placesRequest = new ConstructFetchRequest(
	placesOptions,
	{
		baseUrl: "https://api.foursquare.com/v3/places/search",
		query: "coffee shop",
		fields: "fsq_id,categories,location,name",
		limit: 10,
		near: "cairo",
	}
);

const imagesRequest = new ConstructFetchRequest(
	{},
	{
		baseUrl: "https://api.unsplash.com/search/photos/",
		per_page: 10,
		query: "coffee shop",
		client_id: process.env.UNSPLASH_KEY,
	}
);

export const storesData = new FetchCoffeeStoreData(placesRequest, imagesRequest);

const placesRequestPaths = new ConstructFetchRequest(
	placesOptions,
	{
		baseUrl: "https://api.foursquare.com/v3/places/search",
		query: "coffee shop",
		fields: "fsq_id",
		limit: 10,
		near: "cairo",
	}
);

export const storesDataPaths = new FetchCoffeeStoreData(placesRequestPaths,imagesRequest)
