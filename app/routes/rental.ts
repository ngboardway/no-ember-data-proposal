import Route from '@ember/routing/route';
import Rental from '../view-models/rental';
import ResponseRental from '../response-models/rental';

export default class RentalRoute extends Route {
  async model(params: any): Promise<Rental> {
    let response = await fetch(`/api/rentals/${params.rental_id}.json`);
    let rental: ResponseRental = await response.json();
    return new Rental(rental);
  }
}
