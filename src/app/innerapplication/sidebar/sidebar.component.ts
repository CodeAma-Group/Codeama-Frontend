import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/_authServices/auth.service'
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { CodeamaService } from '../services/codeama.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router, private codeama: CodeamaService ) { }

  cookieVal:string = "";

  userId: string = ''
  userData: any;
  profileRoute: boolean = true;
  amadata;
  ama:boolean = false;

  ngOnInit(): void {

    this.codeama.getcodeamas().subscribe((res) =>{
      this.amadata = res
      this.amadata = this.amadata.data
      console.log(this.amadata);
      for(let i=0; i<this.amadata.length; i++){
        if(this.amadata[i].codeama._id == this.userId){
          this.ama = true;
        }
      }
      
    })
    
    var token = this.authService.getToken()

    if (token != null) {
      this.userData = jwt_decode(token);
      this.userId = this.userData._id;
    }

    if (this.userId == '') {
      this.profileRoute = false
    }

    var cookieName = "isDark";

    var matchCookie = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    if (matchCookie) {
      this.cookieVal = matchCookie[2];
    }

    if (this.cookieVal == "") {
      this.cookieVal = "false"
    } else {

      if (this.cookieVal == "false") {
        let root = document.documentElement;
        root.style.setProperty('--pureWhite', '--pureWhite')
        root.style.setProperty('--mainBlack', '--pureWhite')   
        root.style.setProperty('--dimBlue', '#66A5F0')
        root.style.setProperty('--dimerBlue', '#f2f6fa')
        root.style.setProperty('--mainBlack', '#17202A')
        root.style.setProperty('--inputWhite', '#ffffff')     
        
      } else {
        let root = document.documentElement;
        root.style.setProperty('--modeDimBlue', '--dimBlue')
        root.style.setProperty('--pureWhite', '#0D0E1A')
        root.style.setProperty('--dimBlue', '#1D2747')
        root.style.setProperty('--dimerBlue', '#0F111E')
        root.style.setProperty('--mainBlack', '#ffffff')
        root.style.setProperty('--inputWhite', '#141B30')

      }

    }

  }


  async modeChange() {
    var cookieName = "isDark";
    console.log("yooo")
    var matchCookie = await document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    if (matchCookie) {
      this.cookieVal = matchCookie[2];
      console.log(matchCookie[2])
    }
    else{
      // document.cookie = "isDark=false; path=/; max-age=" + 365*24*60*60;
      // this.cookieVal = "false";
      alert("Make sure your cookies are enabled because we use cookies to keep track of your settings on the devices!")
    }

    if (this.cookieVal == "true") {
      let root = document.documentElement;
      root.style.setProperty('--pureWhite', '--pureWhite')
      root.style.setProperty('--mainBlack', '--pureWhite')

      document.cookie = "isDark=false; path=/; max-age=" + 365*24*60*60;
    } else {
      let root = document.documentElement;
      root.style.setProperty('--pureWhite', '#0D0E1A')
      root.style.setProperty('--mainBlack', '#ffffff')

      document.cookie = "isDark=true; path=/; max-age=" + 365*24*60*60;
    }

  }

  getProfile() {
    var status = this.authService.loggedIn()
    if (status) {
      this.router.navigate(['app/profile', this.userId]);
    } else {
      this.router.navigate(['/auth']);
    }
  }

}
