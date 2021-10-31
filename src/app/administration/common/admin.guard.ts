import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/authentication/_authServices/auth.service';
import { UserService } from 'src/app/innerapplication/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor( private authService: AuthService, private _userService: UserService, private router: Router) { }

  tokenData:any;
  userRole:any;

  canActivate():boolean{
    var token = this.authService.getToken()
    if(token == null){
      this.router.navigate(['/auth']);
			return false;
    }
    else{
      this.tokenData = jwt_decode(token)
      this.userRole = this.tokenData.Badge
      if(this.userRole != "admin"){
        this.router.navigate(['/app']);
		  	return false;
      }
      return true
    }
  }
  
}
