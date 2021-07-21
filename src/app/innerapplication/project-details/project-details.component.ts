import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  constructor() {}
  projectImages = [];
  ProjectImageOnStage: string = '';

  ngOnInit(): void {
    this.projectImages = [
      '../../../assets/images/image1.png',
      '../../../assets/images/image2.png',
      '../../../assets/images/image3.png',
      '../../../assets/images/image1.png',
      '../../../assets/images/image3.png',
    ];
    this.ProjectImageOnStage = this.projectImages[0];
  }
  imageOnStage(data:any) {
    this.ProjectImageOnStage=data.src;
  }
}
