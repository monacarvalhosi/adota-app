import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-apresentacao',
  templateUrl: 'apresentacao.html',
})
export class ApresentacaoPage {
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController){
    
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }


  goToNext(){
    this.slides.slideNext();
  }
  goToProfilePage(){
    this.navCtrl.push('ProfilePage')
  }
 

}
