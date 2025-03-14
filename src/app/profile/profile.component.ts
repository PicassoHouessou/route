import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { updateProfile } from 'firebase/auth';
import { Auth, updateEmail, user, User } from '@angular/fire/auth';

@Component({
   selector: 'app-profile',
   templateUrl: './profile.component.html',
   styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
   profileForm: FormGroup;
   private auth: Auth = inject(Auth);
  user$ = user(this.auth);
   constructor(private formBuilder: FormBuilder) {
       this.profileForm = formBuilder.group({
         email: [
            '',
            [
               Validators.required,
               Validators.email,
               Validators.pattern(
                  '^[a-zA-Z0-9._%+-]+@(?:gmail\\.com|hotmail\\.com|outlook\\.com|yahoo\\.com|yahoo\\.fr)$',
               ),
            ],
         ],
         fullName: ['',
            [Validators.required, Validators.maxLength(200)],
         ],
      });
   }
  ngOnInit(){
this.user$.subscribe((data)=>{
    this.profileForm.setValue({email:data?.email??"",fullName:data?.displayName ??""});
 })
  }

   async handleSubmit() {
      this.profileForm.markAllAsTouched();

      if (this.profileForm.valid) {
         try {
            const result = await updateProfile(this.auth.currentUser as User, {
               displayName: this.profileForm.get('fullName')?.value ?? '',
            });
            await updateEmail(
               this.auth.currentUser as User,
               this.profileForm.get('email')?.value,
            );
            console.log(result);
         } catch (err) {
            console.log(err);
         }
      }
   }
   get email() {
      return this.profileForm.get('email');
   }
   get fullName() {
      return this.profileForm.get('fullName');
   }
}
