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
  url="https://codeama-backend.herokuapp.com/project"
  show:boolean=false
  projectsData:any
  ngOnInit(): void {
    this.projects.getProjects().subscribe((res)=>{
      this.projectsData=res
      console.log(this.projectsData.data);
      this.projectsData=this.projectsData.data;
      this.show=true
    })
  }

}
