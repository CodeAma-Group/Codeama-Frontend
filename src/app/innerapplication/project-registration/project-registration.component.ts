import { THIS_EXPR, variable } from '@angular/compiler/src/output/output_ast';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-project-registration',
  templateUrl: './project-registration.component.html',
  styleUrls: ['./project-registration.component.css'],
})
export class ProjectRegistrationComponent implements OnInit {
  newProject;
  constructor(
    private project: ProjectService,
    private notifier: NotifierService,
    private formBuilder: FormBuilder
  ) {
    this.newProject = this.formBuilder.group({
      projectName: ['', [Validators.required]],
      app_description: ['', [Validators.required]],
      teamName: ['', [Validators.required]],
      githubLink: ['', [Validators.required]],
      appLink: ['', [Validators.required]],
      demo: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      features:this.formBuilder.array([]),
      technologies:this.formBuilder.array([]),
      thumbnails:this.formBuilder.array([])
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
  selectedImg = null;
  OthernewImages = [];
  public imgUrl;
  public logoUrl;
  tagged_tech: Array<any> = [];
  GroupLogo = null;

  logoImage(event) {
    const reader = new FileReader();
    let file = event.target.files[0];
    this.newProject.get('logo').setValue(file);
    reader.addEventListener('load', () => {
      this.logoUrl = reader.result;
    });
    reader.readAsDataURL(event.target.files[0]);
  }

  fileSelected(event) {
    const reader = new FileReader();
    let file = event.target.files[0];
    this.newProject.get('demo').setValue(file);
    reader.addEventListener('load', () => {
      this.imgUrl = reader.result;
    });
    reader.readAsDataURL(event.target.files[0]);
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
          this.newProject.get("thumbnails").push(e.target.result);
          this.thumbnails.push(e.target.result)
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
  featuresArray:any
  Addfeature(data) {
    if (this.newProject.get("features").indexOf(data) == -1) {
      this.newProject.get("features").push(data);
      this.featuresArray.push(data)
      document.getElementById('proFeatures').innerText = '';
    } else {
      alert('Feature should not be repeated');
    }
  }
  techs = [];
  AddTech(data) {
    if (this.newProject.get("technologies") == -1) {
      this.newProject.get("technologies").push(data)
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
    const ProjectData: any = new FormData();
    if (
      this.newProject.value.projectName != null ||
      this.newProject.value.projectName != undefined
    ) {
      ProjectData.append('title', this.newProject.value.projectName);
    }
    if (
      this.newProject.value.app_description != null ||
      this.newProject.value.app_description != undefined
    ) {
      ProjectData.append(
        'description',
        this.newProject.value.app_description
      );
    }
    if (this.newProject.get("technologies") != null || this.newProject.get("technologies") != undefined) {
      ProjectData.append('technologies', JSON.stringify(this.newProject.get("technologies")));
    }
    if (this.newProject.get("thumbnails") != undefined || this.newProject.get("thumbnails") != null) {
      ProjectData.append('thumbnails', JSON.stringify(this.newProject.get("thumbnails")));
    }
    if (
      this.newProject.value.teamName != null ||
      this.newProject.value.teamName != undefined
    ) {
      ProjectData.append('teamName', this.newProject.value.teamName);
    }
    if (this.logoUrl != undefined || this.logoUrl != null) {
      ProjectData.append('logo', this.newProject.value.logo);
    }
    if (
      this.newProject.value.appLink != null ||
      this.newProject.value.appLink != undefined
    ) {
      ProjectData.append('host', this.newProject.value.appLink);
    }
    if (
      this.newProject.value.githubLink != null ||
      this.newProject.value.githubLink != undefined
    ) {
      ProjectData.append('github', this.newProject.value.githubLink);
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
    if (this.newProject.get("features") != null || this.newProject.get("features") != undefined) {
      ProjectData.append('features', JSON.stringify(this.newProject.get("features")));
    }
    if (this.imgUrl != null || this.imgUrl != undefined) {
      ProjectData.append('demo', this.newProject.value.demo);
    }
    this.project.saveProject(ProjectData).subscribe((res) => {
      this.notifier.notify('success', 'New Project posted successfully!');
      alert(res);
    });
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
