import { NgModule } from '@angular/core';
import { StarRatingComponent } from './star-rating/star-rating';
import { CardAnimalComponent } from './card-animal/card-animal';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [StarRatingComponent,
    CardAnimalComponent],
	imports: [
		IonicModule,
	],
	exports: [StarRatingComponent,
    CardAnimalComponent]
})
export class ComponentsModule {}
