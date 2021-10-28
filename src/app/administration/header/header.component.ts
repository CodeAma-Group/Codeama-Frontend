import { Component, OnInit,Input } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../../innerapplication/services/user.service'
import jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../authentication/_authServices/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  tokenData:any;
  userId:any;
  userProfileData:any;
  @Input() headerText: string;
  show:boolean = true;
  
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
        this.spinner.hide()
  
      },
      err => {
        this.authService.logout();
        this.router.navigate(['app'])
      })
    }
  }
  
  toggleFullScreen(){
    if( window.innerHeight == screen.height) {
      let elem:any = document;
      elem.exitFullscreen()
    }else{
      let elem:any =  document.body; 
      let methodToBeInvoked = elem.requestFullscreen || 
       elem.webkitRequestFullScreen || elem['mozRequestFullscreen'] || 
       elem['msRequestFullscreen']; 
      if(methodToBeInvoked) methodToBeInvoked.call(elem);
    }
  }
}
