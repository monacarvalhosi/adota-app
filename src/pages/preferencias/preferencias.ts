import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Adotante } from '../../models/adotante';
import { AutenticacaoProvider } from '../../providers/autenticacao/autenticacao';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-preferencias',
  templateUrl: 'preferencias.html',
})
export class PreferenciasPage {

  adotante : Adotante;
  profile: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private autenticacaoProvider: AutenticacaoProvider, 
    public afAuth: AngularFireAuth, private afDatabase : AngularFireDatabase) {
    this.adotante = navParams.get('adotante');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferenciasPage');
    
  }

  ngOnInit(){
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid){
        // this.adotante = this.afDatabase.list(`adontante/${data.uid}`)
       this.afDatabase.object<Adotante>(`adotante/${data.uid}`).valueChanges().subscribe(profile => {
          this.adotante = profile;
        })
      }
    });
  }

  getPerfil(){
    this.profile = this.autenticacaoProvider.getProfile();
  }

}
