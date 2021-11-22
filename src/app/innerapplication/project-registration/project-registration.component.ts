import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { NotifierService } from 'angular-notifier';
import { delay } from 'rxjs/operators';
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
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.newProject = this.formBuilder.group({
      projectName: ['', [Validators.required]],
      app_description: ['', [Validators.required]],
      teamName: ['', [Validators.required]],
      githubLink: ['', [Validators.required]],
      appLink: ['', [Validators.required]],
      demo: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      features: this.formBuilder.array([]),
      technologies: this.formBuilder.array([]),
      thumbnails: [{}],
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
  public isLoading: boolean = false;
  public logoImage(event: any) {
    const reader = new FileReader();
    let file = event.target.files[0];
    this.newProject.get('logo').setValue(file);
    reader.addEventListener('load', () => {
      this.logoUrl = reader.result;
    });
    reader.readAsDataURL(event.target.files[0]);
  }

  public fileSelected(event: any) {
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
  thumbnailsUrls = [];
  Show: boolean = false;
  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files.length > 5) {
      alert('You not allowed to upload more than 5 images');
    }
    if (files && files.length < 6) {
      // this.thumbnails=files  
      this.Show = true;
      for (let file of files) {
        this.thumbnails.push(file)
        console.warn(this.thumbnails);
        
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
      this.thumbnailsUrls = files;
      this.newProject.get('thumbnails').setValue(files)
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
  deleteNonMember(index) {
    this.emailsArray.splice(index, 1);
  }
  featuresArray = [];
  Addfeature(data) {
    if (this.featuresArray.indexOf(data) == -1) {
      this.featuresArray.push(data);
      // document.getElementById('proFeatures').innerText = '';
    } else {
      alert('Feature should not be repeated');
    }
  }
  deleteFeature(index) {
    this.featuresArray.splice(index, 1);
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
  deleteTech(index) {
    this.techs.splice(index, 1);
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
  deleteTeamMate(index) {
    this.team.splice(index, 1);
  }
  collectData() {
    console.warn(this.urls);
    this.isLoading = true;
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
      ProjectData.append('description', this.newProject.value.app_description);
    }
    if (this.techs != null || this.techs != undefined) {
      ProjectData.append('technologies', `${this.techs}`);
    }
    if (

      this.thumbnails != null ||
      this.thumbnails.length != 0
    ) {
      ProjectData.append('thumbnails', this.thumbnails);
      Object.keys(this.newProject.value.thumbnails).length != 0
    ) {
      for(let thumbnailUrl of this.thumbnailsUrls){
        ProjectData.append('thumbnails',thumbnailUrl);
      }
    }
    if (
      this.newProject.value.teamName != null ||
      this.newProject.value.teamName != undefined
    ) {
      ProjectData.append('teamName', this.newProject.value.teamName);
    }
    if (
      this.newProject.value.logo != undefined ||
      this.newProject.value.logo != null
    ) {
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
      ProjectData.append('team', `${this.team}`);
    }
    if (
      this.emailTags.length != 0 ||
      this.emailTags != null ||
      this.emailTags != undefined
    ) {
      ProjectData.append('non_member_emails', `${this.emailsArray}`);
    }
    if (this.featuresArray != null || this.featuresArray != undefined) {
      ProjectData.append('features', `${this.featuresArray}`);
    }
    if (
      this.newProject.value.demo != null ||
      this.newProject.value.demo != undefined
    ) {
      ProjectData.append('demo', this.newProject.value.demo);
    }
    this.project.saveProject(ProjectData).subscribe((res: any) => {
      if (res.message == 'Project created successfully') {
        this.isLoading = false;
        this.notifier.notify('success', 'New Project posted successfully!');
        // delay(1000);
        // this.router.navigate(['/app/projects']);
      } else {
        this.isLoading = false;
        return this.notifier.notify(
          'error',
          'An error occured while trying to register project'
        );
      }
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
}
