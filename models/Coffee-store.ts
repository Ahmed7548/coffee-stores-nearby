import mongoose from "mongoose"

export interface Store {
  forSquareId: string;
  votes: number;
}


const schema = new mongoose.Schema<Store>({
  forSquareId: {
    type: String,
    index: { unique: true },
    required:true
  },
  votes: {
    type: Number,
    default: 0
  }
}, { autoIndex: false, autoCreate: false })



const CoffeeStore = mongoose.models["Coffee-store"] || mongoose.model("Coffee-store", schema)


export default CoffeeStore