import { ImagesFromApi, QueryOptions, StoresFromApi } from "..";
import ConstructFetchRequest from "./ConstructFetchReques";
import FetchCoffeeStoreData from "./FetchCoffeStoreData";



interface PlacesQueryOptions{
	query: string;
		fields: string;
		limit: number;
		near: string;
}

export const stringSeperator = "nblq2lSeperator";

export const placesOptions = {
	method: "GET",
	headers: {
		Accept: "application/json",
		Authorization: process.env.API_KEY as string,
	},
};

const placesRequest = new ConstructFetchRequest<
	QueryOptions<PlacesQueryOptions>
>(placesOptions, {
	baseUrl: "https://api.foursquare.com/v3/places/search",
	query: "coffee shop",
	fields: "fsq_id,categories,location,name",
	limit: 10,
	near: "cairo",
});

const imagesRequest = new ConstructFetchRequest(
	{},
	{
		baseUrl: "https://api.unsplash.com/search/photos/",
		per_page: 10,
		query: "coffee shop",
		client_id: process.env.UNSPLASH_KEY,
	}
);

export const storesData = new FetchCoffeeStoreData(
	placesRequest,
	imagesRequest
);

const placesRequestPaths = new ConstructFetchRequest(placesOptions, {
	baseUrl: "https://api.foursquare.com/v3/places/search",
	query: "coffee shop",
	fields: "fsq_id",
	limit: 10,
	near: "cairo",
});

export const storesDataPaths = new FetchCoffeeStoreData(
	placesRequestPaths,
	imagesRequest
);


export const transformStoresDataCB=(storeResults: StoresFromApi, imageResults: ImagesFromApi)=> {
	console.log(storeResults)
	const modifiedStores = storeResults.results.map((store, ind) => {
		return {
			id: store.fsq_id,
			name: store.name,
			imgUrl: imageResults.results[ind].urls.small,
			imgId:imageResults.results[ind].id
		};
	});
	return {
		stores: modifiedStores,
	};
}