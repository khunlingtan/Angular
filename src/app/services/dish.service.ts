import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable } from 'rxjs/Observable';

import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

/* only needed to convert observable to promise
import 'rxjs/add/operator/toPromise';
*/
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';

import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class DishService {

  // constructor(private http: Http,
  //             private processHTTPMsgService: ProcessHTTPMsgService) { }

  constructor(private restangular: Restangular,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  /* methods without promise
  getDishes(): Dish[] {
    return DISHES;
  }

  getDish(id: number): Dish {
    return DISHES.filter((dish) => (dish.id === id))[0];
  }

  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }
  */

  /* service with Promise
  getDishes(): Promise<Dish[]> {
    return Promise.resolve(DISHES);
  }

  getDish(id: number): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedDish(): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }
  */

  /* service with promise and delay
  getDishes(): Promise<Dish[]> {
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES), 2000);
    });
  }

  getDish(id: number): Promise<Dish> {
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    });
  }

  getFeaturedDish(): Promise<Dish> {
    return  new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    });
  }
  */

  /* convert observable to promise
  getDishes(): Promise<Dish[]> {
    return Observable.of(DISHES).delay(2000).toPromise();
  }

  getDish(id: number): Promise<Dish> {
    return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000).toPromise();
  }

  getFeaturedDish(): Promise<Dish> {
    return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay(2000).toPromise();
  }
  */

  /* use direct Observable
  getDishes(): Observable<Dish[]> {
    return Observable.of(DISHES).delay(2000);
  }

  getDish(id: number): Observable<Dish> {
    return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);
  }

  getFeaturedDish(): Observable<Dish> {
    return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay(2000);
  }

  getDishIds(): Observable<number[]> {
    return Observable.of(DISHES.map(dish => dish.id ));
  }
  */

// getDishes(): Observable<Dish[]> {
//   return this.http.get(baseURL + 'dishes')
//                   .map(res => { return this.processHTTPMsgService.extractData(res); })
//                   .catch(error => { return this.processHTTPMsgService.handleError(error); });
// }
//
// getDish(id: number): Observable<Dish> {
//   return  this.http.get(baseURL + 'dishes/'+ id)
//                   .map(res => { return this.processHTTPMsgService.extractData(res); })
//                   .catch(error => { return this.processHTTPMsgService.handleError(error); });
// }
//
// getFeaturedDish(): Observable<Dish> {
//   return this.http.get(baseURL + 'dishes?featured=true')
//                   .map(res => { return this.processHTTPMsgService.extractData(res)[0]; })
//                   .catch(error => { return this.processHTTPMsgService.handleError(error); });
// }
//
// getDishIds(): Observable<number[]> {
//   return this.getDishes()
//     .map(dishes => { return dishes.map(dish => dish.id) })
//     .catch(error => { return error; });
// }

  getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
    return  this.restangular.one('dishes',id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({featured: true})
      .map(dishes => dishes[0]);
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id) })
      .catch(error => { return error; } );
  }

}
