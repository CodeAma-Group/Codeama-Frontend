import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  article
  public imgUrl;
  constructor(private formBuilder: FormBuilder) {
    this.article = this.formBuilder.group({
      title: ["",[Validators.required]],
      desc: ["Description here...",[Validators.required]],
      article: ["...",[Validators.required]],
    })
   }

  ngOnInit(): void {
  }
  public imageChange(e: any){
    let fileReader = new FileReader();
    let file = e.target.files[0]
    fileReader.addEventListener('load', () => {
      console.log(fileReader.result)
      this.imgUrl = fileReader.result
    })
    fileReader.readAsDataURL(file)
  }
  submitArt(e: Event){
    e.preventDefault();
    console.log(this.article.value)
  }
}
