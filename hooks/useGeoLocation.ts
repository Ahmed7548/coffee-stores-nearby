import { useState } from "react"

interface LatLng{
   lat: number, lng: number 
}

const useGeoLocation = () => {
  const [latLng, setLatLng] = useState<LatLng>()
  const [err, setErr] = useState<string>()
  

  
  const getGeoLocation = () => {
    if (!navigator.geolocation) {
      setErr("geolocation is not supported in this browser")
    }

    
    
    navigator.geolocation.getCurrentPosition((position) => {
      setLatLng({lat:position.coords.latitude,lng:position.coords.longitude})
    }, (err) => {
      setErr(err.message)
    })
  }
  
  getGeoLocation.promise=getGeoLocationPromise

  function getGeoLocationPromise() {
    return new Promise<LatLng>((resolve, reject:(x:{err:string})=>void) => {
      if (!navigator.geolocation) {
        reject({err:"geolocation is not supported in this browser"})
      }
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({lat:position.coords.latitude,lng:position.coords.longitude})
      }, (err) => {
        reject({err:err.message})
      })
    })
  }
  
  
  return {getGeoLocation,getGeoLocationPromise,err,latLng}
}


export default useGeoLocation