import { THIS_EXPR, variable } from '@angular/compiler/src/output/output_ast';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-project-registration',
  templateUrl: './project-registration.component.html',
  styleUrls: ['./project-registration.component.css'],
})
export class ProjectRegistrationComponent implements OnInit {
  constructor(
    private project: ProjectService,
    private notifier: NotifierService
  ) {}
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
  selectedImg = null;
  OthernewImages = [];
  imgUrl: string = '';
  logoUrl: string = '';
  tagged_tech: Array<any> = [];
  GroupLogo = null;
  logoImage(event) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.logoUrl = event.target.result;
      };
    }
  }

  fileSelected(event) {
    this.selectedImg = event.target.files[0].name;

    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      };
    }
  }

  urls = new Array<string>();
  thumbnails = [];
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
          this.thumbnails.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
  uploadFile() {
    const fd = new FormData();
    fd.append('file', this.selectedImg, this.selectedImg.name);
  }
  emailsArray = [];
  clearInputValue = '';
  emailTags(data) {
    let emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (data.match(emailPattern)) {
      if (this.emailsArray.indexOf(data) == -1) {
        this.emailsArray.push(data);
        // document.getElementById("project-teamm-no-account").value="";
        this.clearInputValue = '';
      } else {
        alert('Each member Email should be unique');
      }
    } else {
      alert('Please Enter a valid email address');
    }
  }

  features = [];
  Addfeature(data) {
    if (this.features.indexOf(data) == -1) {
      this.features.push(data);
      document.getElementById('proFeatures').innerText = '';
    } else {
      alert('Feature should not be repeated');
    }
  }
  techs = [];
  AddTech(data) {
    if (this.techs.indexOf(data) == -1) {
      this.techs.push(data);
      document.getElementById('tagged-tech').innerText = '';
    } else {
      alert('Technology should not be repeated twice');
    }
  }
  team = [];
  // email="something went wrong"
  Addmember(data) {
    if (this.team.indexOf(data) == -1) {
      this.team.push(data);
    } else {
      alert('Team member should not be repeated');
    }
  }
  data;
  collectData() {
    //  console.log(this.newProjectForm.value.logo);
    // var features: any = this.features;
    // var emails: any = this.emailTags;
    // var team: any = this.team;
    // var team: any = this.team;
    // var thumbnails: any = this.thumbnails;
    // var technologies: Array<any> = this.techs;
    const ProjectData: any = new FormData();

    if (
      this.newProjectForm.value.projectName != null ||
      this.newProjectForm.value.projectName != undefined
    ) {
      ProjectData.append('title', this.newProjectForm.value.projectName);
    }
    if (
      this.newProjectForm.value.app_description != null ||
      this.newProjectForm.value.app_description != undefined
    ) {
      ProjectData.append(
        'description',
        this.newProjectForm.value.app_description
      );
    }
    if (this.techs != null || this.techs != undefined) {
      ProjectData.append('technologies', JSON.stringify(this.techs));
    }
    if (this.thumbnails != undefined || this.thumbnails != null) {
      ProjectData.append('thumbnails', JSON.stringify(this.thumbnails));
    }
    if (
      this.newProjectForm.value.teamName != null ||
      this.newProjectForm.value.teamName != undefined
    ) {
      ProjectData.append('teamName', this.newProjectForm.value.teamName);
    }
    if (this.logoUrl != undefined || this.logoUrl != null) {
      ProjectData.append('logo', this.logoUrl);
    }
    if (
      this.newProjectForm.value.appLink != null ||
      this.newProjectForm.value.appLink != undefined
    ) {
      ProjectData.append('host', this.newProjectForm.value.appLink);
    }
    if (
      this.newProjectForm.value.githubLink != null ||
      this.newProjectForm.value.githubLink != undefined
    ) {
      ProjectData.append('github', this.newProjectForm.value.githubLink);
    }
    if (this.team.length != 0 || this.team != undefined || this.team != null) {
      ProjectData.append('team', JSON.stringify(this.team));
    }
    if (
      this.emailTags.length != 0 ||
      this.emailTags != null ||
      this.emailTags != undefined
    ) {
      ProjectData.append('non_member_emails', JSON.stringify(this.emailsArray));
    }
    if (this.features != null || this.features != undefined) {
      ProjectData.append('features', JSON.stringify(this.features));
    }
    if (this.imgUrl != null || this.imgUrl != undefined) {
      ProjectData.append('demo', JSON.stringify(this.imgUrl));
    }
    // this.data = {
    //   title: this.newProjectForm.value.projectName,
    //   description: this.newProjectForm.value.app_description,
    //   technologies: this.techs,
    //   thumbnails: this.urls,
    //   demo: this.imgUrl,
    //   teamName: this.newProjectForm.value.teamName,
    //   logo: this.logoUrl,
    //   github: this.newProjectForm.value.githubLink,
    //   host: this.newProjectForm.value.appLink,
    //   team: this.team,
    //   non_member_emails: this.emailTags,
    //   features: this.features,
    // };
// console.log(this.imgUrl);

    this.project.saveProject(ProjectData).subscribe((res) => {
      this.notifier.notify('success', 'New Project posted successfully!');
      alert(res);
      console.log('result is here', res);
    });
  }
  newProjectForm = new FormGroup({
    projectName: new FormControl(''),
    // tagged_tech:new FormControl(''),
    app_description: new FormControl(''),
    teamName: new FormControl(''),
    githubLink: new FormControl(''),
    appLink: new FormControl(''),
    logo: new FormControl(''),
  });

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