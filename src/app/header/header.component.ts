import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../login/auth.service';
import { DataService } from '../todoinput/data.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userIsAuthentication :boolean= false;
  private authStatus:Subscription;

  constructor(
    private authService : AuthService,
    private dataservice : DataService,
    private profileservice : ProfileService
    ) { }

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
    this.profileservice.deactivateAccount();
    this.dataservice.deactivateAccount();
    this.authService.Logout();
  }
  testGetDetailsPP(){
    this.dataservice.testGetDetails();
  }
}
