import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
   userIsAuthenticated = false ;
  private authListenerSub : Subscription;
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getisAuth();
    this.authListenerSub = this.authService.getauthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated
    });
  }
  ngOnDestroy(){
      this.authListenerSub.unsubscribe();
  }
  onlogout(){
    this.authService.logout();
  }

}
