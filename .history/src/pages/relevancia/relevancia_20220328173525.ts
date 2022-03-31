import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Adotante } from '../../models/adotante';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { DialogoProvider } from '../../providers/dialogo/dialogo';

@IonicPage()
@Component({
  selector: 'page-relevancia',
  templateUrl: 'relevancia.html',
})
export class RelevanciaPage {

  adotante = {} as Adotante;
  flagEditar = false;


  constructor(private afAuth : AngularFireAuth, private afDatabase : AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams, private dialogoProvider : DialogoProvider) {
      this.adotante = this.navParams.get('adotante');
  }

  ngOnInit(){
    this.verificaRelevancia();
  }

  createRelevancia(){
    this.afAuth.authState.take(1).subscribe(auth =>
      {this.afDatabase.object(`adotante/${auth.uid}`).set(this.adotante).then(() => this.navCtrl.setRoot(HomePage))})
  }

  verificaRelevancia(){
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid){
       this.afDatabase.object<Adotante>(`adotante/${data.uid}`).valueChanges().subscribe(relevancia => {
         if(relevancia) {
           console.log(relevancia); this.adotante = relevancia;
           this.flagEditar = true;
          }
        })
      }
    });
  }


}
