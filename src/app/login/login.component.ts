import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public currentProfileId: string;

  public user: any = {
    profileId: undefined
  };

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.currentProfileId = this.authService.getProfileId();
  }

  public login() {
    console.log('user', this.user);
    if (this.user.profileId) {
      this.authService.setProfileId(this.user.profileId);
      this.router.navigate(['/conversations']);
    }
  }

  public logout() {

    this.authService.clearProfileId();
    this.currentProfileId = null;


  }


}
