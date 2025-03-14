import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, Firestore,addDoc,updateDoc } from '@angular/fire/firestore';
import { Statistic } from '../interfaces/dtos/api';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  constructor(private readonly firestore:Firestore,private readonly auth:Auth) { }

  addStat(stat:Statistic){
    let $stat=collection(this.firestore,'statistique');
    return addDoc($stat,{depart:stat.départ,destination:stat.destination,horaire:stat.horaire,jour:stat.jours,nombre_fois:1});
  }

  // updateStat(stat:Statistic){
  //   let $stat=collection(this.firestore,'statistique');
  //   return updateDoc(stat,{...stat,nombre_fois:stat.nombre_fois+1})
  // }
}
