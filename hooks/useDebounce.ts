import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, debounceTime: number, cb?: (value:T)=>void) => {
	const [returnValue, setReturnValue] = useState<T>(value);

	useEffect(() => {
		if (!value) {
			return
		}
		const timeOut = setTimeout(() => {
			setReturnValue(value);
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
