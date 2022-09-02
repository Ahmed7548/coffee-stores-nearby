import React,{useReducer} from "react"
import { Store } from "..";
import StoreContext from "./store-context"
import {State} from "./store-context"


export enum ACTION_TYPES {
  SET_STORES_NEARBY= "SET_STORES_NEARBY "
}



const storeReducer = (state: State, action: {
  type: ACTION_TYPES;
  payload:any
}) => {
  switch (action.type) {
    case ACTION_TYPES.SET_STORES_NEARBY: {
      return {
        ...state,coffeeStores:action.payload
      }
    }
    default: {
      return state
      }
  }
}


const StoreProvider = ({ children }: { children:React.ReactNode}) => {
  const initialState = {
    latLng: "",
    coffeeStores:[]
  }
  const [state,dispatch]=useReducer(storeReducer,initialState)

  return (
    <StoreContext.Provider value={{state,dispatch}}>
      {children}
    </StoreContext.Provider>
  )
}


export default StoreProvider