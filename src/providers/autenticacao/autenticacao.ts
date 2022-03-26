import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Adotante } from '../../models/adotante';

@Injectable()
export class AutenticacaoProvider {

  constructor(public afAuth: AngularFireAuth, private afDatabase : AngularFireDatabase,) {
    console.log('Hello AutenticacaoProvider Provider');
  }

  getProfile(){
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid){
        // this.adotante = this.afDatabase.list(`adontante/${data.uid}`)
       return this.afDatabase.object<Adotante>(`adotante/${data.uid}`).valueChanges().subscribe(profile => {
          return profile;
        })
      }
    });
  }  
}
