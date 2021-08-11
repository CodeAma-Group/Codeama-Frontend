import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private project: ProjectService,
    private spinner:NgxSpinnerService
  ) {}
  projectImages = [];
  ProjectImageOnStage: string = '';
  projectData: any;
  url="https://codeama-backend.herokuapp.com/"
  ngOnInit(): void {
    this.spinner.show()
    this.project.getProject(this.router.snapshot.params.id).subscribe((res) => {
      this.projectData = res;
      this.projectData = this.projectData.data;
      for (let i = 0; i < this.projectData.length; i++) {
        this.ProjectImageOnStage=this.url+this.projectData[i].demo
      }
    });
    this.spinner.hide()
  }
  // this.ProjectImageOnStage = this.projectImages[0];
  imageOnStage(data: any) {
    this.ProjectImageOnStage = data.src;
  }
}
