import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { updateProfile } from 'firebase/auth';
import { Auth, updateEmail, user, User } from '@angular/fire/auth';
import { HistoricService } from '../statistique/statistique.service';
import { Historic } from '../interfaces/dtos/api';
import { formatDate, formatTime } from '@/config/util.date';
import { Router } from '@angular/router';

@Component({
   selector: 'app-profile',
   templateUrl: './profile.component.html',
   styleUrl: './profile.component.css',
})
export class ProfileComponent implements AfterViewInit {
   profileForm: FormGroup;
   private auth: Auth = inject(Auth);
   private historicService=inject(HistoricService);
   private router:Router=inject(Router);
   private $user:User| null=null;
   constructor(private formBuilder: FormBuilder) {
      const user = this.auth.currentUser;
      this.$user=this.auth.currentUser;
      this.profileForm = formBuilder.group({
         email: [
            user?.email ?? '',
            [
               Validators.required,
               Validators.email,
               Validators.pattern(
                  '^[a-zA-Z0-9._%+-]+@(?:gmail\\.com|hotmail\\.com|outlook\\.com|yahoo\\.com|yahoo\\.fr)$',
               ),
            ],
         ],
         fullName: [
            user?.displayName ?? '',
            [Validators.required, Validators.maxLength(200)],
         ],
      });
   }

   historiques:Historic[]=[];
   async ngAfterViewInit(): Promise<void> {
      try {
         const res=await this.historicService.getAllHistoric(this.$user?.email as string);
         if (!res.empty) {

            res.forEach(doc=>this.historiques.push(doc.data() as Historic));
         }
      } catch (error) {
         console.log(error);
      }
   }

   async handleSubmit() {
      this.profileForm.markAllAsTouched();

      if (this.profileForm.valid) {
         try {
            const result = await updateProfile(this.auth.currentUser as User, {
               displayName: this.fullName,
            });
            await updateEmail(
               this.auth.currentUser as User,
               this.email,
            );
            console.log(result);
         } catch (err) {
            console.log(err);
         }
      }
   }
   get email() {
      return this.profileForm.get('email')?.value;
   }
   get fullName() {
      return this.profileForm.get('fullName')?.value;
   }

   deleteHistoric(hist:Historic){
      this.historicService.deleteHistoric(hist).then(()=>this.router.navigateByUrl('/profil',{onSameUrlNavigation:'reload'})).catch(error=>console.log("echec de la suppression"));
   }

  protected readonly formatDate = formatDate;
  protected readonly formatTime = formatTime;
}
