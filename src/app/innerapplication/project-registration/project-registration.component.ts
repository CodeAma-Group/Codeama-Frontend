import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-project-registration',
  templateUrl: './project-registration.component.html',
  styleUrls: ['./project-registration.component.css'],
})
export class ProjectRegistrationComponent implements OnInit {
  selectedImg = null;
  OthernewImages = [];
  imgUrl: string = '';
  videoUrl: string = '../../../assets/newImages/video.mp4';
  question;
  constructor(private formBuilder: FormBuilder) {
    this.question = this.formBuilder.group({
      title: ['', []],
      desc: ['', []],
      qtn: ['...', []],
      tagged_tech: ['', []],
    });
  }
  public options = [
    { label: 'Java', value: 'Java' },
    { label: 'Javascript', value: 'Javascript' },
    { label: 'Vuex', value: 'Vuex' },
    { label: 'React', value: 'React' },
    { label: 'Rust', value: 'Rust' },
    { label: 'C', value: 'C' },
    { label: 'C++', value: 'C++' },
    { label: 'C#', value: 'C#' },
    { label: 'Go', value: 'Go' },
    { label: 'HTML', value: 'HTML' },
    { label: 'CSS', value: 'CSS' },
    { label: 'SCSS', value: 'SCSS' },
    { label: 'SASS', value: 'SASS' },
    { label: 'Angular', value: 'Angular' },
    { label: 'Python', value: 'Python' },
    { label: 'Svelte', value: 'Svelte' },
    { label: 'Typescript', value: 'Typescript' },
    { label: 'Ruby', value: 'Ruby' },
    { label: 'Haskell', value: 'Haskell' },
    { label: 'NextJs', value: 'NextJs' },
    { label: 'Php', value: 'Php' },
  ];
  public fields = { text: 'label', value: 'value' };

  fileSelected(event) {
    this.selectedImg = event.target.files[0].name;
    console.log(event.timeStamp + this.selectedImg);

    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
        // this.videoUrl = event.target.result;
      };
    }
  }

  urls = new Array<string>();
  Show: boolean = false;
  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files.length > 5) {
      alert('You not allowed to upload more than 5 images');
    }
    if (files && files.length < 6) {
      this.Show = true;
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  uploadFile() {
    const fd = new FormData();
    fd.append('file', this.selectedImg, this.selectedImg.name);
  }

 

  cookieVal: string = '';

  ngOnInit(): void {
    
    var cookieName = 'isDark';

    var matchCookie = document.cookie.match(
      new RegExp('(^| )' + cookieName + '=([^;]+)')
    );
    if (matchCookie) {
      this.cookieVal = matchCookie[2];
    }

    if (this.cookieVal == '') {
      this.cookieVal = 'false';
    } else {
      if (this.cookieVal == 'false') {
        let root = document.documentElement;
        root.style.setProperty('--pureWhite', '--pureWhite');
        root.style.setProperty('--mainBlack', '--pureWhite');
        root.style.setProperty('--dimBlue', '#66A5F0');
        root.style.setProperty('--dimerBlue', '#f2f6fa');
        root.style.setProperty('--mainBlack', '#17202A');
        root.style.setProperty('--inputWhite', '#ffffff');
      } else {
        let root = document.documentElement;
        root.style.setProperty('--modeDimBlue', '--dimBlue');
        root.style.setProperty('--pureWhite', '#0D0E1A');
        root.style.setProperty('--dimBlue', '#1D2747');
        root.style.setProperty('--dimerBlue', '#0F111E');
        root.style.setProperty('--mainBlack', '#ffffff');
        root.style.setProperty('--inputWhite', '#141B30');
      }
    }
  }

  async modeChange() {
    var cookieName = 'isDark';
    console.log('yooo');
    var matchCookie = await document.cookie.match(
      new RegExp('(^| )' + cookieName + '=([^;]+)')
    );
    if (matchCookie) {
      this.cookieVal = matchCookie[2];
      console.log(matchCookie[2]);
    } else {
      // document.cookie = "isDark=false; path=/; max-age=" + 365*24*60*60;
      // this.cookieVal = "false";
      alert(
        'Make sure your cookies are enabled because we use cookies to keep track of your settings on the devices!'
      );
    }

    if (this.cookieVal == 'true') {
      let root = document.documentElement;
      root.style.setProperty('--pureWhite', '--pureWhite');
      root.style.setProperty('--mainBlack', '--pureWhite');

      document.cookie = 'isDark=false; path=/; max-age=' + 365 * 24 * 60 * 60;
    } else {
      let root = document.documentElement;
      root.style.setProperty('--pureWhite', '#0D0E1A');
      root.style.setProperty('--mainBlack', '#ffffff');

      document.cookie = 'isDark=true; path=/; max-age=' + 365 * 24 * 60 * 60;
    }
  }
}
