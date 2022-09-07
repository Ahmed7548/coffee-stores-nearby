import React, { useEffect } from "react"
import useSWR,{Fetcher} from "swr"
import { Store } from "../../models/Coffee-store"

const fetcher= (url:string)=>fetch(url).then(res=>res.json())


const useStore = <T>(id:string,setdata:React.Dispatch<React.SetStateAction<T>>,cb?:(value:T)=>void) => {
  const {data,error,isValidating,mutate}=useSWR(`http://localhost:3000/api/upvote/${id}`,fetcher)

  useEffect(() => {
    console.log(data)
    if (data) {
      setdata(data.votes)
      if (cb) {
        cb(data.votes)
      }
    }
  },[data,setdata,cb])

  return {data,error,isValidating,mutate}
}


export default useStore