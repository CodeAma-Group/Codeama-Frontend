import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  // @Output() modeChange:EventEmitter<any> = new EventEmitter()

  // modeChangeChild() {
  //   alert("this works")
  //   this.modeChange.emit()
  // }

  cookieVal:string = ""

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

}
