import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaAnimaisPage } from './lista-animais';

@NgModule({
  declarations: [
    ListaAnimaisPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaAnimaisPage),
  ],
})
export class ListaAnimaisPageModule {}
