import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map'
import { LoadingController } from 'ionic-angular';
import { AvaliadoModel } from '../../models/avaliado';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AvaliadosProvider {

  private PATH = 'avaliados/';
  public loading;
  private userId = '';
  avaliacao : AvaliadoModel;
  
  constructor(private db: AngularFireDatabase,
    public loadingCtrl:LoadingController,
    public afAuth: AngularFireAuth,
    ) {
    console.log('Hello AvaliadosProvider Provider');
    this.afAuth.authState.take(1).subscribe(data => {
      this.userId = data.uid;
      console.log(this.userId);
    }); 
  }

  getAll() {
    return this.db.list(this.PATH  + "/"+ this.userId)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }


  getAllAdmin() {
    return this.db.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  getOneAdmin(key:string){
    return this.db.list(this.PATH + '/' + key)
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })
  }

  get(key: string) {
    return this.db.object(this.PATH  + "/"+ this.userId + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }
 
  save(avaliado: any) {
    return new Promise((resolve, reject) => {
      if (avaliado.key) {
        this.db.list(this.PATH + "/"+ this.userId)
          .update(avaliado.key, { 
            rating: avaliado.rating, 
            dataHora: avaliado.dataHora,            
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH + "/"+ this.userId)
          .push({ 
            rating: avaliado.rating, 
            dataHora: avaliado.dataHora,
           })
          .then(() => resolve());
      }
    })
  }
 
  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

  
}
