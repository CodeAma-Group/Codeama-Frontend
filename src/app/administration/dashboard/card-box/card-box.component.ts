import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemCountsService } from 'src/app/innerapplication/services/item-counts.service';


@Component({
  selector: 'app-card-box',
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.css']
})
export class CardBoxComponent implements OnInit {
  @Input() card;
  @Input() index;
  articles: any = [];
  amas: any = []
  bugs: any = []
  questions: any = []
  resources: any = []
  constructor(private itemsCountService: ItemCountsService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
    this.itemsCountService.getArticlesCount()
    .subscribe(async(res: any) => {
      this.articles = res.data
    })

    this.itemsCountService.getAmas()
      .subscribe(async (res: any) => {
        this.amas = res.data
      })
    
      this.itemsCountService.getResources()
      .subscribe(async (res: any) => {
        this.resources = res.data
      })
    
      this.itemsCountService.getQuestions()
      .subscribe(async (res: any) => {
        this.questions = res.data
      })
    
      this.itemsCountService.getBugs()
      .subscribe(async (res: any) => {
        this.bugs = res.data
      })
  }

  getCounts() {
    switch (this.card.title) {
      case 'CodeAmas': 
        return this.amas.length
      case 'Articles':
        return this.articles.totalDocs
      case 'Resources':
        return this.resources.totalDocs
      case 'Bugs Published':
        return this.bugs.length
      case 'Other questions':
          return this.questions.length
    }
    this.spinner.hide()

  }

}
