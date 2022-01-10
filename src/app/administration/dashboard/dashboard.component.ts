import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemCountsService } from 'src/app/innerapplication/services/item-counts.service';
import { BugService } from '../../innerapplication/services/bug.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  articles:any = []
  amaCount = 0
  bugsCount = 0
  resourceCount =0 
  questionsCount =0 
  constructor( private bugService: BugService, private itemsCountService: ItemCountsService,  ) { }

  ngOnInit(): void {
    this.itemsCountService.getArticlesCount()
    .subscribe(async(res: any) => {
      this.articles = res.data
    })
    
    // console.log('article',this.itemsCountService.getArticlesCount())
  }
  

  cards = [
    {
      title: "CodeAmas",
      totalCount: this.amaCount,
      icon: "../../assets/icons/Group 67.png"
    },

    {
      title: "Bugs Published",
      totalCount: this.bugsCount,
      icon: "../../assets/icons/Group 68.png"
    },

    {
      title: "Resources",
      totalCount: this.resourceCount,
      icon: "../../assets/icons/Group 69.png"
    },

    {
      title: "Articles",
      totalCount: this.articles.length,
      icon: "../../assets/icons/Group 70.png"
    },

    {
      title: "Other questions",
      totalCount: this.questionsCount,
      icon: "../../assets/icons/Group 71.png"
    }
  ]

  
  activities = [
    {
      icon: "../../assets/icons/Group 72.png",
      activity: "Challenges",
      startDate: "12th January 2021",
      stats: ["12,345","1000","345"]
    },

    {
      icon: "../../assets/icons/Group 73.png",
      activity: "Projects",
      startDate: "14th January 2021",
      stats: ["12,345","100"]
    }
  ]

  

}
