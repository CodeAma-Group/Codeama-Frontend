import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private projects:ProjectService,private spinner:NgxSpinnerService) { }
  id=10;
  url="https://codeama-backend.herokuapp.com"
  show:boolean=false
  image;
  projectsData:any
  
  ngOnInit(): void {
    this.spinner.show()
    this.projects.getProjects().subscribe((res)=>{
      this.projectsData=res
      this.projectsData=this.projectsData.data;
      console.log(this.projectsData);
      
      this.image=this.url+'/'+this.projectsData[0].demo      
      this.show=true
      this.spinner.hide()
    })
  }

}
