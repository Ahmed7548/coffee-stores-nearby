import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, debounceTime: number, cb?: (value:T)=>void) => {
	const [returnValue, setValue] = useState<T>(value);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setValue(value);
			if (cb) {
				cb(value);
			}
		}, debounceTime);
		return () => {
			clearTimeout(timeOut);
		};
	},[value,debounceTime,cb]);

	return returnValue;
};

export default useDebounce;