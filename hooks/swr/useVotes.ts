import React, { useEffect } from "react";
import useSWR from "swr";

// const fetcher= (url:string)=>fetch(url).then(res=>res.json())

const useStore = <T>(
	id: string,
	setdata: React.Dispatch<React.SetStateAction<T>>,
	cb?: (value: T) => void
) => {
	const { data, error, isValidating, mutate } = useSWR(`/api/upvote/${id}`);

	useEffect(() => {
		if (data) {
			setdata(data.votes);
			if (cb) {
				cb(data.votes);
			}
		}
	}, [data, setdata, cb]);

	return { data, error, isValidating, mutate };
};

export default useStore;
