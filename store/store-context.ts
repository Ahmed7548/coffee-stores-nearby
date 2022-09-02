import React, { createContext } from "react";
import { Store } from "..";
import {ACTION_TYPES} from "./StoreProvider"

export interface State{
  latLng: string;
  coffeeStores:Store[]
}

const StoreContext = createContext<{
  state: State;
  dispatch: React.Dispatch<{type:ACTION_TYPES,payload:any}>
 }>({dispatch:()=>{},state:{latLng:'',coffeeStores:[]}})


 export default StoreContext