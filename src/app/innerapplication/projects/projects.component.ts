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
  projectsData={}
  ngOnInit(): void {
    this.projects.getProjects().subscribe((res)=>{
      console.log(res);
      this.projectsData=res
    })
  }

}
