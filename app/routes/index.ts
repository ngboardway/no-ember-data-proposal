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
