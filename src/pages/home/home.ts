import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, NavParams, Content } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../models/user';
import { Adotante } from '../../models/adotante';
import { RecomendacaoProvider } from '../../providers/recomendacao/recomendacao';
import { AnimaisProvider } from '../../providers/animais/animais';
import { AnimalModel } from '../../models/animal';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { AvaliadosProvider } from '../../providers/avaliados/avaliados';
import { AvaliadoModel } from '../../models/avaliado';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
 
})
export class HomePage {
  @ViewChild(Content)
  content:Content;

  adotante : Adotante;
  recomendados :  AnimalModel[];
  user: User = {id: '', email: '', password:''};
  form: FormGroup;
  public avaliacao : AvaliadoModel = { key: '', rating: 0, dataHora: new Date,};
  avaliados : any[];
  listaAnimais : AnimalModel[];
  animal : AnimalModel;
  ratingValue : number = 0;
  countRecomendados : number = 0; 
  recomendaRandomico = false;

  constructor(public navCtrl: NavController,  public navParams: NavParams,
    public afAuth: AngularFireAuth,
    private afDatabase : AngularFireDatabase,
    private recomendacao : RecomendacaoProvider,
    private provider: AnimaisProvider,
    private avaliacaoProvider: AvaliadosProvider,
    private dialogo: DialogoProvider,
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder,) {
    console.log('Hello Home Page')

    this.recomendaRandomico = this.navParams.get('randomico')
    console.log(this.recomendaRandomico)
  }

  ngOnInit(){
    this.afAuth.authState.take(1).subscribe(data => {
      this.dialogo.abreCarregando();
      if(data && data.email && data.uid){
        this.user.id = data.uid;
        this.user.email = data.email;
        this.afDatabase.object<Adotante>(`adotante/${data.uid}`).valueChanges().subscribe(res => {
          if(res){
            this.adotante = res;
          } else{
            this.dialogo.fechaCarregando();
            this.navCtrl.push('ApresentacaoPage')
          }
        })
        this.provider.getAll().subscribe(res => { 
          console.log(res)
          const lista : any[] = res
          this.listaAnimais = lista;
          if(this.adotante && this.listaAnimais){
            this.dialogo.fechaCarregando();
          this.getAvaliados();  
          }
        })
        
      }else{
        this.dialogo.exibirToast("Não foi possível se autenticar");
      }
    })

  }

  filtrar(lista: any, item: any){
    const filtrados = lista.filter(animal => animal.porte === item.porte || animal.porte === "medio");
    return filtrados;
  }
   

 removerAvaliados(animais: any[], avaliacoes: any[]){
   animais.map(animal =>{ animal.avaliacao = 0})
   for (let index = 0; index < avaliacoes.length; index++) {
     const avaliacao = avaliacoes[index];
     const animal = animais.find(item => item.key === avaliacao.key)
     if(animal){
       const indice = animais.indexOf(animal)
       animais.splice(indice,1)
     }
   }
    return animais
  }

  getAvaliados(){
    // this.listaAnimais = this.filtrar(this.listaAnimais, this.adotante);
    this.avaliacaoProvider.getAll().take(1).subscribe(item =>{
      this.dialogo.abreCarregando()
      this.avaliados = item;
      const novaLista = this.removerAvaliados(this.listaAnimais, this.avaliados);
      let listaRecomendados;

      if(!this.recomendaRandomico){
        /** Recomendação */
        console.log('RECOMENDAAAAR')
        listaRecomendados = this.recomendacao.cosineSimilaraty(this.adotante, novaLista).slice(0,5); 
      }else{
        /** Randômico - sem recomendação */
        console.log('RANDOM')
        listaRecomendados = this.recomendacao.recomendacaoRandom(novaLista).slice(0,5);
      }
      this.recomendados = this.getFoto(listaRecomendados)
      this.atualizaPerfil();
      console.log('atualizando perfil') 
      this.countRecomendados += 5;
      this.dialogo.fechaCarregando();
    })
   
  }

  getFoto(lista: any){
    lista.forEach(item =>{
      this.provider.getFotoAnimal(item.key).then(foto => { 
        if(foto) item.foto = foto      
      })
    })
    return lista;
    
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.avaliacao.key],
      rating: [this.avaliacao.rating,],
      dataHora: [this.avaliacao.dataHora,],  
    });
  }

  salvaAvaliacao(){
    this.createForm();
     this.avaliacaoProvider.save(this.form.value)
      .catch((e) => {
        console.error(e);
      })
  }

  logRatingChange(rating, animal){
    this.recomendados.forEach(i => {
      if(i.key === animal.key) i.avaliacao = rating
    })
    console.log(this.recomendados)
    this.avaliacao.key = animal.key;
    this.avaliacao.rating = rating;
    this.avaliacao.dataHora = new Date;
    this.salvaAvaliacao(); 
    if(rating > this.ratingValue){
      this.animal = animal;
      this.ratingValue = rating;
      this.recomendarComNovoPerfil(this.animal)
    }
  }

  recomendarComNovoPerfil(animal : AnimalModel){
    if(animal.similaridade >= this.animal.similaridade){
      this.adotante.amigavel_crianca = animal.amigavel_crianca;
      this.adotante.brincadeira = animal.brincadeira;
      this.adotante.exercicio = animal.exercicio;
      this.adotante.guarda = animal.guarda;
      this.adotante.moradia = animal.moradia;
      this.adotante.pelagem = animal.pelagem;
      this.adotante.porte = animal.porte;
      this.adotante.queda_pelo = animal.queda_pelo;
      this.adotante.sexo = animal.sexo;
      this.adotante.tendencia_latir = animal.tendencia_latir;
      console.log(this.adotante)
    }
  }

  scrollUp(event){
    // this.content.scrollToTop(2000);
   
    this.dialogo.abreCarregando();
    const pendente = this.avaliacaoPendente();
    if(!pendente){
      this.content.scrollTo(0, 85, 1500)
      this.getAvaliados();
      
    }
    this.dialogo.fechaCarregando();

  }

  avaliacaoPendente(){
    const naoAvaliado = this.recomendados.filter(i => i.avaliacao == 0)
    if(naoAvaliado.length > 0){
      console.log(naoAvaliado)
      this.content.scrollTo(0, 85, 1500)
      this.dialogo.exibirAlert('Avalie todos os 5 animais recomendados');
      return true
    }else{
      return false;
    }
  }

  atualizaPerfil(){
    this.afDatabase.object(`adotante/${this.user.id}`).set(this.adotante).then((result) => console.log(result))
  }

  goToConclusaoPage(){
    const pendente = this.avaliacaoPendente();
    if(!pendente){
      this.navCtrl.push('ConclusaoPage', {'recomendaRandomico': this.recomendaRandomico})
    }
  } 
  go(){
    this.navCtrl.push('ConclusaoPage', {'recomendaRandomico': true})
  }
  openMenu() {
    this.menuCtrl.open();
  }

  sair(){
    this.afAuth.auth.signOut().then(()=>{ this.navCtrl.setRoot('LoginPage')})
  }

}