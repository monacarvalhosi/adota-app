import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AnimaisProvider } from '../providers/animais/animais';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AnimalPageModule } from '../pages/animal/animal.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ListaAnimaisPageModule } from '../pages/lista-animais/lista-animais.module';
import { RecomendacaoProvider } from '../providers/recomendacao/recomendacao';
import { RegisterPageModule } from '../pages/register/register.module';
import { StarRatingModule } from 'ionic3-star-rating';


import { LoginPage } from '../pages/login/login';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { PreferenciasPageModule } from '../pages/preferencias/preferencias.module';
import { DialogoProvider } from '../providers/dialogo/dialogo';
import { AvaliadosProvider } from '../providers/avaliados/avaliados';
import { AutenticacaoProvider } from '../providers/autenticacao/autenticacao';
import { AvaliadosPageModule } from '../pages/avaliados/avaliados.module';
import { ConclusaoPageModule } from '../pages/conclusao/conclusao.module';
import { ApresentacaoPageModule } from '../pages/apresentacao/apresentacao.module';
import { RelevanciaPage } from '../pages/relevancia/relevancia';
import { RelevanciaPageModule } from '../pages/relevancia/relevancia.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AnimalPageModule,
    ListaAnimaisPageModule,
    RegisterPageModule,
    ProfilePageModule,
    PreferenciasPageModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAPrpDXAUjsixUg7zOvOi3AkKkz_LhdBMI",
      authDomain: "adota-app-firebase.firebaseapp.com",
      databaseURL: "https://adota-app-firebase-default-rtdb.firebaseio.com/",
      projectId: "adota-app-firebase",
      storageBucket: "adota-app-firebase.appspot.com",
      messagingSenderId: "787594501290",
      appId: "1:787594501290:web:01b0bd95fda8d1590604d3"
    })
    /*AngularFireModule.initializeApp({
      apiKey: "AIzaSyCh3j2HD3jVE9mfDYiI0_Z-oA7wsTakVrE",
      authDomain: "fir-adote-app.firebaseapp.com",
      databaseURL: "https://fir-adote-app.firebaseio.com",
      projectId: "fir-adote-app",
      storageBucket: "fir-adote-app.appspot.com",
      messagingSenderId: "895899701153"
    })*/,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    StarRatingModule,
    AvaliadosPageModule,
    ConclusaoPageModule,
    ApresentacaoPageModule,
    RelevanciaPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RelevanciaPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AnimaisProvider,
    DialogoProvider,
    RecomendacaoProvider,
    AvaliadosProvider,
    AutenticacaoProvider,
    Camera

  ]
})
export class AppModule { }
