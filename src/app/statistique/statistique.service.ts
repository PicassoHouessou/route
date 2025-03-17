import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { collection, Firestore,addDoc, doc, collectionData, deleteDoc, setDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Historic } from '../interfaces/dtos/api';

@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  $user:any=null;

  constructor(private readonly firestore:Firestore,private readonly auth:Auth) { 
    user(auth).subscribe(value=>{
      if (value && value.email) {
        this.$user=value.email;
      }
    });
  }

  addStat(stat:Historic){
    let $stat=collection(this.firestore,'historique');
    return addDoc($stat,{depart:stat.depart,destination:stat.destination,horaire:stat.horaire,jour:stat.jour,owner:this.$user});
  }

  getAllHistoric(){
    const q = query(collection(this.firestore, "historique"));
    return getDocs(q);
  }

  deleteHistoric(hist:Historic){
    return deleteDoc(doc(this.firestore,'historique',hist.jour as string));
  }
}
