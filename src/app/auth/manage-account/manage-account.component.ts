import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {
  states: string[] = ['Ariana', 'Béja', 'BenArous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kebili', 'Kef', 'Mahdia', 'Manouba', 'Medenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis','Zaghouan'];

  constructor(public authService : AuthService) { }

  ngOnInit(): void {
    
  }
  updateAccount(form : NgForm){
    this.authService.updateAccount(form.value,localStorage.userId).subscribe((res)=>{
    this.authService.logout();
    });
  }
}
