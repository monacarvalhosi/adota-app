import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ListaAnimaisPage } from '../lista-animais/lista-animais';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { DialogoProvider } from '../../providers/dialogo/dialogo';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController,public firebaseauth: AngularFireAuth, private dialogo: DialogoProvider) {
  }

  ionViewDidLoad(){
    // if(this.user) this.login();
  }

  async login(){
    this.dialogo.abreCarregando()
    try{
      const result = await this.firebaseauth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if(result){
        this.navCtrl.setRoot(HomePage);
      }
    }
    catch(e) {
      console.error(e);
      if(e.code === 'auth/user-not-found') this.dialogo.exibirToast('E-mail não cadastrado')
      if(e.code === 'auth/wrong-password') this.dialogo.exibirToast('Senha incorreta')
    }
    this.dialogo.fechaCarregando()
      
  }

  async register(user: User) {
   this.navCtrl.push(RegisterPage);
}



}
