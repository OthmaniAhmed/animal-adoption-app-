import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  states: string[] = ['Ariana', 'Béja', 'BenArous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kebili', 'Kef', 'Mahdia', 'Manouba', 'Medenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis','Zaghouan'];
 
  constructor(public authServise : AuthService) { }

  ngOnInit(): void {
  }
 
  onsignup(form : NgForm){
   
   if(form.invalid){
     return;
   }
   this.authServise.createUser(form.value.email,form.value.password,form.value.name,form.value.phoneNumber,form.value.state)
  
  }
}
