import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppsettingsService {

  constructor() { }

  cookieVal:string = "";

  settings() {
    
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
      } else {
        let root = document.documentElement;
        root.style.setProperty('--pureWhite', '#0D0E1A')
        root.style.setProperty('--mainBlack', '#ffffff')
      }

    }
  }
}
