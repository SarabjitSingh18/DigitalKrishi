import mongoose,{Schema,Document,models,model} from "mongoose";
import { unique } from "next/dist/build/utils";
export interface IFarmer extends Document{
    clerkId:string,
    name:string,
    phone:string,
    location:string,
    preferredLanguage: string;
    crops:string[]
}
const FarmerSchema = new Schema({
    clerkId:{type:String,required:true,unique:true},
    name:{type:String},
    phone:{type:String},
    location:{type:String},
    preferredLanguage:{type:String, default:"ml-IN"},
    crops:[{type:String}]

},{timestamps:true})

const Farmer = models.Farmer || mongoose.model<IFarmer>("Farmer",FarmerSchema)
export default Farmer