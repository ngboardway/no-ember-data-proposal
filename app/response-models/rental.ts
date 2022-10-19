import { MapLocation } from "./location";

export default interface Rental {
  id: string;
  title: string;
  owner: string;
  city: string;
  location: MapLocation;
  category: string;
  image: string;
  bedrooms: number;
  description: string;
}