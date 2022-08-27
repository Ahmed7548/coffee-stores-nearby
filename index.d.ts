
export interface StoreFromApi{
	fsq_id: string;
	categories: {
		id: number;
		name: string;
	}[];
	location: {
		country: string;
		cross_street: string;
		formatted_address: string
	};
	name: string;
	link:string
}