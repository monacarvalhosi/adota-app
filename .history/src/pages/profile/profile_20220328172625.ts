import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Adotante } from '../../models/adotante';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { RelevanciaPage } from '../relevancia/relevancia';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  adotante = {} as Adotante;
  flagEditar = false;


  constructor(private afAuth : AngularFireAuth, private afDatabase : AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.verificaProfile();
  }

  setPageRelevancia(){
    //this.afAuth.authState.take(1).subscribe(() => this.navCtrl.setRoot(RelevanciaPage))
    this.navCtrl.setRoot(RelevanciaPage, { 'adotante': this.adotante })
  }

  createProfile(){
    this.afAuth.authState.take(1).subscribe(auth =>
      {this.afDatabase.object(`adotante/${auth.uid}`).set(this.adotante).then(() => this.navCtrl.setRoot(HomePage))})
  }

  verificaProfile(){
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid){
       this.afDatabase.object<Adotante>(`adotante/${data.uid}`).valueChanges().subscribe(profile => {
         if(profile) {
           console.log(profile); this.adotante = profile;
           this.flagEditar = true;
          }
        })
      }
    });
  }


}
