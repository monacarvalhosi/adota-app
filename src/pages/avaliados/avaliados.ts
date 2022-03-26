import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { AnimaisProvider } from '../../providers/animais/animais';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { AnimalModel } from '../../models/animal';
import { AvaliadosProvider } from '../../providers/avaliados/avaliados';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { RecomendacaoProvider } from '../../providers/recomendacao/recomendacao';
import { User } from '../../models/user';
import { Adotante } from '../../models/adotante';
import { AvaliadoModel } from '../../models/avaliado';
import { rejects } from 'assert';

@IonicPage()
@Component({
  selector: 'page-avaliados',
  templateUrl: 'avaliados.html',
})
export class AvaliadosPage {

  animais: AnimalModel[];
  user: User = { id: '', email: '', password: '' };
  adotante: Adotante;
  listaAnimais: AnimalModel[];
  avaliados: any[];
  listaAvaliados: Array<AvaliadoModel> = [];

  listaCincoPrimeiros: Array<number> = [];
  listaCincoUltimos: Array<number> = [];
  listaDezUltimos: Array<number> = [];
  listaAdotantes: Array<string> = [];
  adotantes: any;
  totalUsuario : number = 0;
  listMAP: number = 0;
  totalMAP: number = 0;
  totalMRR: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private recomendacao: RecomendacaoProvider,
    private provider: AnimaisProvider,
    private avaliacaoProvider: AvaliadosProvider,
    private dialogo: DialogoProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliadosPage');
  }

  ngOnInit() {
    //this.avaliacaoProvider.getAll().subscribe(res => console.log(res))
    this.getAdotantes();
  }

  calcularMAP(posicaoLista, lista){
    let mapPorUsuario = 0;
    let map = 0;
    let count = 1;
    let relevante = 0;

    for (let index = 0; index <= (posicaoLista-1); index++) {
        
      const element = lista[index];
      if(element.rating >= 4){ // rating >= 4 é considerado relevante
        relevante = relevante +1; //0
        map = relevante / count
        count = count +1;
      }
      else{
        map = relevante /count
        count = count +1;
      }
      mapPorUsuario = mapPorUsuario + map;
    }

    const total = mapPorUsuario / posicaoLista;
    this.totalMAP = this.totalMAP + total;
    console.log(total)
    console.log('MAP: '+this.totalMAP)
  }
  
  calcularMRR(posicaoLista, lista){
    let mrr = 0;
    let countMrr = 1;
    let relevante = 0;

    for (let index = 0; index <= (posicaoLista-1); index++) {
      
      const element = lista[index];
      if(element.rating >= 4){
        relevante = relevante +1; //0
        mrr = relevante / countMrr;
        this.totalMRR = this.totalMRR + mrr;
        console.log('MRR: '+this.totalMRR)
        return
      }
      countMrr = countMrr +1;
    }   
  }

  organizarPorUsuario(key: string) {
    this.avaliacaoProvider.getOneAdmin(key).subscribe( async res => {
      let lista = this.ordenar( await res)
      if(lista.length >= 10){
      const ordenados : any[] = lista.slice(5,10)
      console.log(lista)
      console.log(ordenados)

      this.totalUsuario = this.totalUsuario + 1 // quantidade de usuários
      console.log(this.totalUsuario)
      
      this.calcularMAP(3, ordenados)
      this.calcularMRR(3, ordenados)
    }
    })
  
  }

  countOccurrences (arr, val){
    return arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  }


  getAvaliacoes(lista: any[]){
    for (let index = 0; index < lista.length; index++) {
      const element = lista[index];
      this.organizarPorUsuario(element)

    }
  }

  ordenar(lista: any) {
    let ordenados = lista.sort((a, b) => {
      if (a.dataHora < b.dataHora) { return -1 }
      if (a.dataHora > b.dataHora) { return 1 }
      return 0;
    })
    return ordenados;
  }

  
   getAdotantes() {
      this.avaliacaoProvider.getAllAdmin()
      .subscribe( async res => {
        console.log(res)
          await res.forEach(item =>{
            console.log(item.key)
            this.organizarPorUsuario(item.key);
          })
          
      })

  }



  carregarListaAnimais() {
    this.dialogo.abreCarregando();
    this.provider.getAll().subscribe(res => {
      const lista: any[] = res
      this.animais = lista;
      this.dialogo.fechaCarregando();
    })
  }

  relacionarAvaliados(animais: any, avaliacoes: any) {
    for (let index = 0; index < animais.length; index++) {
      const animal = animais[index];
      if (avaliacoes.length > 0) {
        for (let index = 0; index < avaliacoes.length; index++) {
          const avaliacao = avaliacoes[index];
          if (animal.key === avaliacao.key) {
            animal.avaliacao = avaliacao.rating
          } else {
            const indice = animais.indexOf(animal)
            animais.splice(indice, 1)
          }
        }
      }
    }
    return animais;
  }
}
