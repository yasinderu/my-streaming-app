import { ObjectId } from "mongodb";

export interface Profile {
  _id?: ObjectId;
  id?: string;
  userId: string;
  pin?: string;
  name: string;
  avatar: string;
}
