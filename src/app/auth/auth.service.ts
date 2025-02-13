import { inject, Injectable } from '@angular/core';
import { Credentials } from '../interfaces/auth';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);

  signIn(credential:Credentials){

    return signInWithEmailAndPassword(this.auth,credential.email!,credential.password!)
  }

  signUp(credential:Credentials){

    return createUserWithEmailAndPassword(this.auth,credential.email!,credential.password!);
  }

  logOut(){
    
    return this.auth.signOut();
  }
}
