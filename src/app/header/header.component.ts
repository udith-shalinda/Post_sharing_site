import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userIsAuthentication :boolean= false;
  private authStatus:Subscription;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authStatus = this.authService.getAuthStatusListner().subscribe(response=>{
      this.userIsAuthentication = response;
    });
  }
  ngOnDestroy(){
    this.authStatus.unsubscribe();
  }
  Logout(){
    this.authService.Logout();
  }
  deleteAccout(){
    this.authService.DeleteAccount();
  }
}
