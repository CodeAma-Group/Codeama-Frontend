import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../../innerapplication/services/user.service'
import jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../authentication/_authServices/auth.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  tokenData:any;
  userId:any;
  userProfileData:any;
  
  constructor( private authService: AuthService, private _userService: UserService,private spinner:NgxSpinnerService, private router: Router) { }
  
  ngOnInit(): void {
    this.spinner.show()
    var token = this.authService.getToken()
    if(token == null){
      this.authService.logout();
      this.router.navigate(['app'])
    }
    else{
      this.tokenData = jwt_decode(token)
      this.userId = this.tokenData._id
      this._userService.getUserEntireProfileData(this.userId).subscribe((res) => {
        this.userProfileData = res["data"];
        var image:any = document.querySelector('#profile-pic');
        var isLoaded = image.complete && image.naturalHeight !== 0;
        if(isLoaded){
          setTimeout(() => {
            this.spinner.hide()
          }, 1000);
        }
      },
      err => {
        this.authService.logout();
        this.router.navigate(['app'])
      })
    }
  }
}
