import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';


@Injectable()
export class DialogoProvider {
  loading;

  constructor(
              public alert: AlertController,
              public loadingCtrl: LoadingController,
              private toast: ToastController,
              ) {
    console.log('Hello DialogoProvider Provider');
  }

  abreCarregando() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando' 
    });

    this.loading.present();
  }

  fechaCarregando(){
    this.loading.dismiss();
  }

  exibirToast(mensagem: string){
    let toast = this.toast.create({
      duration: 3000,
      position: 'botton'
    });
    toast.setMessage(mensagem);
    toast.present();
  }

  exibirAlert(mensagem: string){
    const alert = this.alert.create({
      title: 'Atenção',
      subTitle: mensagem,
      buttons: ['Ok']
    });
    alert.present();
  }

    
}


