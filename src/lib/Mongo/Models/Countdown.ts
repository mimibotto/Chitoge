import { Schema, model } from "mongoose";
import { ICountdown } from "../../../typings";
const cdSchema = new Schema({
  jid: {
    type: String,
    required: true,
    unique: true,
   },
  rob: {
      type:Number
  }
});
export default model<ICountdown>("countdown", cdSchema);
