import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs-compat';
// import { map } from 'rxjs-compat/operators/map';
import 'rxjs/add/operator/map'
import { LoadingController } from 'ionic-angular';
import { storage } from 'firebase';
import { AnimalPage } from '../../pages/animal/animal';
import firebase from 'firebase';

@Injectable()
export class AnimaisProvider {

  private PATH = 'animais/';
  public loading;
  private user;
  constructor(private db: AngularFireDatabase,
    public loadingCtrl:LoadingController,) {
    console.log('Hello AnimaisProvider Provider');
    this.user = firebase.auth().currentUser.uid;
  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('nome'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }
 
  save(animal: any) {
    return new Promise((resolve, reject) => {
      if (animal.key) {
        this.db.list(this.PATH)
          .update(animal.key, { 
            nome: animal.nome, 
            moradia: animal.moradia,
            porte: animal.porte,
            pelagem: animal.pelagem, 
            sexo: animal.sexo, 
            amigavel_crianca: animal.amigavel_crianca, 
            guarda: animal.guarda, brincadeira: animal.brincadeira, 
            exercicio: animal.exercicio,
            queda_pelo: animal.queda_pelo, 
            tendencia_latir: animal.tendencia_latir,
            prop_porte: animal.prop_porte,
            prop_sexo: animal.prop_sexo,
            prop_guarda: animal.prop_guarda,
            prop_amigavel_crianca: animal.prop_amigavel_crianca,
            prop_brincadeira: animal.prop_brincadeira,
            prop_exercicio: animal.prop_exercicio,
            prop_queda_pelo: animal.prop_queda_pelo,
            prop_tendencia_latir: animal.prop_tendencia_latir,
            foto: animal.foto,
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ 
            nome: animal.nome, 
            moradia: animal.moradia,
            porte: animal.porte,
            pelagem: animal.pelagem, 
            sexo: animal.sexo,
            amigavel_crianca: animal.amigavel_crianca, 
            guarda: animal.guarda, 
            brincadeira: animal.brincadeira, 
            exercicio: animal.exercicio,
            queda_pelo: animal.queda_pelo, 
            tendencia_latir: animal.tendencia_latir,
            prop_porte: animal.prop_porte,
            prop_sexo: animal.prop_sexo,
            prop_guarda: animal.prop_guarda,
            prop_amigavel_crianca: animal.prop_amigavel_crianca,
            prop_brincadeira: animal.prop_brincadeira,
            prop_exercicio: animal.prop_exercicio,
            prop_queda_pelo: animal.prop_queda_pelo,
            prop_tendencia_latir: animal.prop_tendencia_latir,
            foto: animal.foto,

           })
          .then(() => resolve());
      }
    })
  }
 
  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

  setFotoAnimal(imageName: any, image: any){
    const fotoAnimal = storage().ref('pictures' + '/' + imageName);
    fotoAnimal.putString(image, 'data_url').then((saveFoto)=>{  console.log(saveFoto)
      return 'url';
    })
  }  

  getFotoAnimal(imageName: any){
    const imagem = storage().ref().child('pictures' + '/' + imageName);
     return imagem.getDownloadURL();
  }

  getFoto(imageName: any){
    return new Promise((resolve, reject) =>{
      const imagem = storage().ref().child('pictures' + '/' + imageName);
      imagem.getDownloadURL().then((url) =>{
        const urlImage = url;    
        return urlImage; 
      })
      .then(() => resolve())
      .catch((e) => reject(e))
    })
  }

} 
