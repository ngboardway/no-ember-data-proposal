# Proposal
This is my proposal for how to handle data in MiRead 2.0. Ignore any relative imports, this is not the pinnacle of good practices.


## Response Model
```typescript
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
```

## View Model
```typescript
import { MapLocation } from '../response-models/location';
import ResponseRental from '../response-models/rental';

const COMMUNITY_CATEGORIES = ['Condo', 'Townhouse', 'Apartment'];

export default class Rental {
  private _id: string;
  public get id(): string {
    return this._id;
  }

  private _title: string;
  public get title(): string {
    return this._title;
  }

  private _owner: string;
  public get owner(): string {
    return this._owner;
  }

  private _city: string;
  public get city(): string {
    return this._city;
  }

  private _location: MapLocation;
  public get location(): MapLocation {
    return this._location;
  }

  private _category: string;
  public get category(): string {
    return this._category;
  }

  private _image: string;
  public get image(): string {
    return this._image;
  }

  private _bedrooms: number;
  public get bedrooms(): number {
    return this._bedrooms;
  }

  private _description: string;
  public get description(): string {
    return this._description;
  }

  get type(): string {
    if (COMMUNITY_CATEGORIES.includes(this.category)) {
      return 'Community';
    } else {
      return 'Standalone';
    }
  }

  constructor(responseRental: ResponseRental) {
    this._id = responseRental.id;
    this._bedrooms = responseRental.bedrooms;
    this._category = responseRental.category;
    this._city = responseRental.city;
    this._description = responseRental.description;
    this._image = responseRental.image;
    this._location = responseRental.location;
    this._owner = responseRental.owner;
    this._title = responseRental.title;
  }
}
```

## Route
```typescript
import Route from '@ember/routing/route';
import Rental from '../view-models/rental';
import ResponseRental from '../response-models/rental';

export default class IndexRoute extends Route {
  async model(): Promise<Rental[]> {
    let response = await fetch('/api/rentals.json');
    let rentals: ResponseRental[] = await response.json();
    return rentals.map(r => new Rental(r));
  }
}
```