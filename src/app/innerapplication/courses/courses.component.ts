import { Component, OnInit } from '@angular/core';
import { InnerapplicationService } from '../innerapplication.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public articles: any[] = []
  constructor(private backendService: InnerapplicationService) { }

  ngOnInit(): void {
    this.backendService.getArticles().subscribe((data: any[]) => {
      this.articles = data
    })
  }


}
