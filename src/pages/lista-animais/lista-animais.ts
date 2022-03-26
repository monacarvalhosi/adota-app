import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, IonicPage, AlertController } from 'ionic-angular';
import { AnimaisProvider } from '../../providers/animais/animais';
import { AnimalPage } from '../animal/animal';
import { DialogoProvider } from '../../providers/dialogo/dialogo';

@IonicPage()
@Component({
  selector: 'page-lista-animais',
  templateUrl: 'lista-animais.html',
})
export class ListaAnimaisPage {

   animais: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: AnimaisProvider,
    private toast: ToastController,
    private alert: AlertController,
    private dialogo: DialogoProvider,) {
    this.animais = navParams.get('animais');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaAnimaisPage');

  }

  ngOnInit(){
    this.carregarListaAnimais();
  }

  carregarListaAnimais(){
    this.dialogo.abreCarregando();
    this.provider.getAll().subscribe(res => { 
      this.animais = res;
      this.dialogo.fechaCarregando();

    })
  }
  
  ordenar(lista: any) {
    let ordenados = lista.sort((a,b)=>{
      if(a.similaridade < b.similaridade) {return -1}
      if(a.similaridade > b.similaridade) {return 1}
      return 0;
    })
    return ordenados;
  }

  newAnimal() {
    this.navCtrl.push(AnimalPage);
  }

  editAnimal(animal: any) {
    // Maneira 1
    // this.navCtrl.push('AnimalPage', { animal: animal });

    // Maneira 2
    this.navCtrl.push('AnimalPage', { key: animal.key });
  }

  removeAnimal(key: string) {
    let alert = this.alert.create({
      title: 'Excluir animal',
      message: 'Deseja excluir?',
      buttons: [
        {
            text: 'Não',
            handler: () => {
                console.log('Cancelado');
            }
        },
        {
            text: 'Sim',
            handler: () => {
              if (key) {
                this.provider.remove(key)
                  .then(() => {
                    this.toast.create({ message: 'Animal removido com sucesso.', duration: 3000 }).present();
                  })
                  .catch(() => {
                    this.toast.create({ message: 'Erro ao remover animal.', duration: 3000 }).present();
                  });
              }
            }
        }
    ]
    });
    alert.present();

    
  }

}
