import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { StarRatingModule } from 'ionic3-star-rating';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    StarRatingModule,
    ComponentsModule,
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}