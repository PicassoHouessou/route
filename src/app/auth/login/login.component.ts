import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private readonly authService:AuthService){}

  login=new FormGroup({
    email:new FormControl('',[Validators.email,Validators.required]),
    password:new FormControl('',[Validators.maxLength(15),Validators.minLength(4),Validators.required])
  })

  async signIn(){

    if (this.login.valid) {
      try{
        const auth=await this.authService.signIn({email:this.login.get('email')?.value,password:this.login.get('password')?.value});
        if (auth.user) {
          this.login.reset();
        }
      }catch(err){

        console.log(err);
      }
    }
  }
}
