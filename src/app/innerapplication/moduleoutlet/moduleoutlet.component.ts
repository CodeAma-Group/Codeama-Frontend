import { HostListener, ElementRef,Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/_authServices/auth.service'
import {filterWords, sampleData} from "./Search"


@Component({
  selector: 'app-moduleoutlet',
  templateUrl: './moduleoutlet.component.html',
  styleUrls: ['./moduleoutlet.component.css']
})
export class ModuleoutletComponent implements OnInit {
  cookieVal: string = "";
  constructor(private authService: AuthService, private router: Router, private elementRef:ElementRef ) { }


  loggedIn: boolean = false;
  searchWords;
  suggestedWords: sampleData[] = [];
  showSearch = false;

  ngOnInit(): void {
    var status = this.authService.loggedIn()
    if (status) {
      this.loggedIn = true;
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
        root.style.setProperty('--contBgLight', 'rgba(66, 144, 237, .1)')
        root.style.setProperty('--questBg','#F7F9FC')
        root.style.setProperty('--bgBlue', '#F4F7FB')
        root.style.setProperty('--minorProfileWhite', '#FCFDFE')
      } else {
        let root = document.documentElement;
        root.style.setProperty('--modeDimBlue', '--dimBlue')
        root.style.setProperty('--pureWhite', '#0D0E1A')
        root.style.setProperty('--dimBlue', '#1D2747')
        root.style.setProperty('--dimerBlue', '#0F111E')
        root.style.setProperty('--mainBlack', '#ffffff')
        root.style.setProperty('--inputWhite', '#141B30')
        root.style.setProperty('--contBgLight', '#151829')
        root.style.setProperty('--questBg',"rgba(0, 0, 0, 0.178)")
        root.style.setProperty('--bgBlue', '#151829')
        root.style.setProperty('--minorProfileWhite', '#0F111E')
      }
    }

  }


  async modeChange() {
    var cookieName = "isDark";
    var matchCookie = await document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    if (matchCookie) {
      this.cookieVal = matchCookie[2];
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
      root.style.setProperty('--dimBlue', '#66A5F0')
      root.style.setProperty('--dimerBlue', '#f2f6fa')
      root.style.setProperty('--mainBlack', '#17202A')
      root.style.setProperty('--inputWhite', '#ffffff')     
      root.style.setProperty('--contBgLight', 'rgba(66, 144, 237, .1)')
      root.style.setProperty('--questBg','#F7F9FC')
      root.style.setProperty('--bgBlue', '#F4F7FB')
      root.style.setProperty('--minorProfileWhite', '#FCFDFE')
      root.style.setProperty('--shareBg', '#F7FAFC')

      document.cookie = "isDark=false; path=/; max-age=" + 365*24*60*60;
    } else {
      let root = document.documentElement;
      // root.style.setProperty('--pureWhite', '#0D0E1A')
      root.style.setProperty('--mainBlack', '#ffffff')
      root.style.setProperty('--contBgLight', '#151829')
      root.style.setProperty('--questBg',"rgba(0, 0, 0, 0.178)")
      root.style.setProperty('--modeDimBlue', '--dimBlue')
      root.style.setProperty('--pureWhite', '#0D0E1A')
      root.style.setProperty('--dimBlue', '#1D2747')
      root.style.setProperty('--dimerBlue', '#0F111E')
      root.style.setProperty('--mainBlack', '#ffffff')
      root.style.setProperty('--inputWhite', '#141B30')
      root.style.setProperty('--contBgLight', '#151829')
      root.style.setProperty('--questBg',"rgba(0, 0, 0, 0.178)")
      root.style.setProperty('--bgBlue', '#151829')
      root.style.setProperty('--minorProfileWhite', '#0F111E')
      root.style.setProperty('--shareBg', '#0F111E')

      document.cookie = "isDark=true; path=/; max-age=" + 365*24*60*60;
    }
  }

  @HostListener('click', ['$event.target']) onClick(target) {
    console.log(this.elementRef)
    const clicked = this.elementRef.nativeElement 
    console.log(target)
    console.log(clicked)
  }
//   @HostListener('document:click', ['$event.target']) onClick(target) {
//     const clickedInside = this.elementRef.nativeElement.contains(target);
//     if (!clickedInside) {
//       console.log("clicking")
//     }
// }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  login() {
    this.router.navigate(['/auth'])
  }

  filterSearch(value){
     let searchedModule = new RegExp(value, 'i')
     this.searchWords = filterWords.filter(el => 
      el.name.match(searchedModule) || 
      el.description.match(searchedModule) 
     ) 
      this.showSearch = true;
  }
  stopSearch(){
    console.log(`reached here`);
    this.showSearch = false;
  }
}
