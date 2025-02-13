import { inject, Injectable } from '@angular/core';
import { Credentials } from '../interfaces/auth';
import { Auth, user, User } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
        //handle user state changes here. Note, that user will be null if there is no currently logged in user.
     console.log(aUser);
    })
  }

  signIn(credential:Credentials){

    return signInWithEmailAndPassword(this.auth,credential.email!,credential.password!)
  }

  signUp(credential:Credentials){

    return createUserWithEmailAndPassword(this.auth,credential.email!,credential.password!);
  }
}
