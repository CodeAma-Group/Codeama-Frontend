import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  constructor() { }
projectImages=[]
  ngOnInit(): void {
    this.projectImages = [
      '../../../assets/images/image1.png',
      '../../../assets/images/image2.png',
      '../../../assets/images/image3.png',
      '../../../assets/images/image1.png',
      '../../../assets/images/image3.png',
    ];
  }
  ProjectImageOnStage=this.projectImages[1];
  imageOnStage(){
    for (let i = 0; i < this.projectImages.length; i++) {
      // const imageOnStage = this.projectImages[0];
      
    }
  }

}
