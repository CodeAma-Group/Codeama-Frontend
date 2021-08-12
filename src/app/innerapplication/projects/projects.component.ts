import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private projects:ProjectService) { }
  id=10;
  url="https://codeama-backend.herokuapp.com"
  show:boolean=false
  image;
  projectsData:any
  
  ngOnInit(): void {
    this.projects.getProjects().subscribe((res)=>{
      this.projectsData=res
      this.projectsData=this.projectsData.data;
      this.image=this.url+'/'+this.projectsData[0].demo      
      this.show=true
    })
  }

}
