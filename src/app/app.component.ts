import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild(Nav) nav: Nav

  pages:Array <{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
               public firebaseauth: AngularFireAuth,  private afDatabase : AngularFireDatabase,) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.initializeApp();

    this.pages = [
      {title: 'Meu perfil', component: 'ProfilePage'},
      {title: 'Lista de Animais', component: 'ListaAnimaisPage'},
      // {title: 'Cadastrar Animal', component: 'AnimalPage'},
      {title: 'Minhas avaliações', component: 'AvaliadosPage'},
    ]
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page){
    this.nav.push(page.component);
  }

  
  sair(){
     this.firebaseauth.auth.signOut().then(()=>{ this.nav.setRoot(LoginPage)})
     
  }
    
    
      
  

}

