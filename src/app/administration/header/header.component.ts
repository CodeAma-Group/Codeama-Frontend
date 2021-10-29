import { Component, OnInit,Input } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { UserService } from '../../innerapplication/services/user.service'
import jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter } from 'rxjs/operators';
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
  headerText: string;
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
      switch(this.router.url){
        case '/admin/dashboard':
          this.headerText = "Admin dashboard";
          break;
        case '/admin/our-users':
          this.headerText = "Codeama users";
          break;
        case '/admin/codeamas':
          this.headerText = "Codeama amas";
          break;
        case '/admin/admin-group':
          this.headerText = "Codeama admin users";
          break;
        case '/admin/notifications':
          this.headerText = "Notifications";
          break;
      }
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)  
      ).subscribe((event: NavigationEnd) => {
        switch(event.url){
          case '/admin/dashboard':
            this.headerText = "Admin dashboard";
            break;
          case '/admin/our-users':
            this.headerText = "Codeama users";
            break;
          case '/admin/codeamas':
            this.headerText = "Codeama amas";
            break;
          case '/admin/admin-group':
            this.headerText = "Codeama admin users";
            break;
          case '/admin/notifications':
            this.headerText = "Notifications";
            break
        }
      });
      
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

  logout(){
    this.router.navigate(['app'])
    this.authService.logout();
  }
}
