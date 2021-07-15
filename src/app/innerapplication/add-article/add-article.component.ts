import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  article
  constructor(private formBuilder: FormBuilder) {
    this.article = this.formBuilder.group({
      title: [""],
      desc: [""],
      article: ["..."]
    })
   }

  ngOnInit(): void {
  }
  submitArt(e: Event){
    e.preventDefault();
    console.log(this.article.value)
  }
}
