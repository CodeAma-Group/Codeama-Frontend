import { Component, OnInit } from '@angular/core';
import { InnerapplicationService } from '../innerapplication.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  public resources: any[] 

  constructor(private backendService: InnerapplicationService) { }

  ngOnInit(): void {
    this.backendService.getResources().subscribe(data => this.resources=data)
  }

  public checkResourceType(type: string){
    if(type == "Youtube video" || type=="Youtube Video"){
      return "youtube video"
    }
    else if(type == "CodeAma article"){
      return "article"
    }
  }

}
