import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Adotante } from '../../models/adotante';
import { DialogoProvider } from '../../providers/dialogo/dialogo';

/**
 * Generated class for the ConclusaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conclusao',
  templateUrl: 'conclusao.html',
})
export class ConclusaoPage {
  @ViewChild(Nav) nav: Nav

  randomico: boolean;
  adotante = {} as Adotante;
  abrirSugestao : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afAuth : AngularFireAuth, private afDatabase : AngularFireDatabase,
    private dialogo : DialogoProvider,
    public plateform : Platform ) {
    this.randomico = this.navParams.get('recomendaRandomico')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConclusaoPage');
    this.verificaProfile();
  }

  goToHome(){
    this.navCtrl.setRoot(HomePage, { 'randomico': true })
  }

  enviarSugestao(){
    console.log(this.adotante)
    this.afAuth.authState.take(1).subscribe(auth => 
      {this.afDatabase.object(`adotante/${auth.uid}`).set(this.adotante).then(() => {
        this.dialogo.exibirAlert('Enviado com sucesso')
      }  
    )})
  }
  
   
  sair(){
    // this.plateform.exitApp();
    // this.navCtrl.setRoot('LoginPage')
    window.close();
    
 }

 openSugestao(){
   this.abrirSugestao = true;
 }

  verificaProfile(){
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid){
       this.afDatabase.object<Adotante>(`adotante/${data.uid}`).valueChanges().subscribe(profile => {
         if(profile) {
           console.log(profile); this.adotante = profile;
          }
        })
      }
    });
  }

}
