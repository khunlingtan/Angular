import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;

  constructor(private dishservice: DishService,
              private promotionservice: PromotionService,
              private leaderservice: LeaderService,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    /* without promise
    this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promotionservice.getFeaturedPromotion();
    this.leader = this.leaderservice.getFeaturedLeaders();
    */

    this.dishservice.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
      dishErrMess => this.dishErrMess = <any>dishErrMess);

    this.promotionservice.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
      promoErrMess => this.promoErrMess = <any>promoErrMess);

    this.leaderservice.getFeaturedLeaders()
      .subscribe(leader => this.leader = leader,
      leaderErrMess => this.leaderErrMess = <any>leaderErrMess);

  }

}
