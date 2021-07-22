import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { InnerapplicationService } from '../innerapplication.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  public resources: any[] 

  constructor(private backendService: InnerapplicationService, private spinner: NgxSpinnerService) { 
    this.spinner.show()
    this.backendService.getResources().subscribe(data => {
      this.resources=data
      this.spinner.hide()
    })
  }

  ngOnInit(): void {

  }

  public checkResourceType(type: string){ 
    if(type == "Youtube video" || type=="Youtube Video"){`  `
      return "youtube video"
    }
    else if(type == "Article"){
      return "article"
    }
  }

}
