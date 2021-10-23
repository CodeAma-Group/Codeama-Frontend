import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { InnerapplicationService } from '../innerapplication.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoursesComponent implements OnInit {
  public articles: any[] = []
  constructor(private backendService: InnerapplicationService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
    this.backendService.getArticles().subscribe((data: any[]) => {
      this.articles = data
      this.spinner.hide()
    })
  }

  checkBadge(badge: string){
    let className:string = ""
    switch(badge.toLowerCase()){
      case "absolute beginner": className = "absBeg";
        break;
      case "intermediate": className = "interm";
        break;
      case "pro": className = "pro";
       break;
      default: className="beginner"
    }
    return className
  }

}
