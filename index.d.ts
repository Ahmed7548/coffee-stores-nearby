
export interface StoreFromApi{
	fsq_id: string;
	categories: {
		id: number;
		name: string;
	}[];
	location: {
		country: string;
		cross_street: string;
		formatted_address: string;
		locality: string;
	};
	name: string;
	link:string
}

export interface StoresFromApi {
	results:StoreFromApi[]
}


export interface ImageFromApi {
	alt_description: string;
	urls: {
		regular: string;
		small: string;
	}
	id: string;
}

export interface ImagesFromApi{
	results:ImageFromApi[]
}


export interface 	SingleStore{
	id: string;
	imgId: string;
	name:string;
	imgUrl: string;
	websiteUrl: string;
	address:string;
	neighbourhood: string;
	upvotes: number;
}


export type QueryOptions = {
	baseUrl: string;
	query?: string;
	ll?: string;
	near?: string;
	fields?: string;
	limit?: number;
} & {
	[key: string]: string | number | undefined;
};

