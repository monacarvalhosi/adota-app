import { Component } from '@angular/core';

/**
 * Generated class for the StarRatingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'star-rating',
  templateUrl: 'star-rating.html'
})
export class StarRatingComponent {

  text: string;

  constructor() {
    console.log('Hello StarRatingComponent Component');
    this.text = 'Hello World';
  }

}
