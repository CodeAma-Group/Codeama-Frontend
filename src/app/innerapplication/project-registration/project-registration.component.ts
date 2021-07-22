import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-registration',
  templateUrl: './project-registration.component.html',
  styleUrls: ['./project-registration.component.css'],
})
export class ProjectRegistrationComponent implements OnInit {
  selectedFile = null;
  constructor() {}
  imgUrl: string ="";
  videoUrl:string="../../../assets/images/video.mp4"
  // ../../../assets/images/image1.png
  technologies=["money","something","anything","mine"];
  tech:string="";
displayTechnologies(){
  let newTech=this.tech
  if (newTech) {
    this.technologies.push(newTech);
  }
  for (let index = 0; index < this.technologies.length; index++) {
    console.log(this.technologies[index]);
  }
}



  fileSelected(event) {
    this.selectedFile = event.target.files[0].name;
    // console.log(new Date()+this.selectedFile);
    console.log(event.timeStamp+this.selectedFile);

    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        // this.imgUrl = event.target.result;
        this.videoUrl = event.target.result;
      };
    }
  }
  uploadFile() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
  }
  

  cookieVal:string = "";

  ngOnInit(): void {

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

}
