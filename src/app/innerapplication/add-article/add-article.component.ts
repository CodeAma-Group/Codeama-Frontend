import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import jwt_decode from 'jwt-decode'
import { NgxSpinnerService } from 'ngx-spinner';
import { InnerapplicationService } from '../innerapplication.service';


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  article
  public imgUrl;
  constructor(private formBuilder: FormBuilder, private backendService: InnerapplicationService, private spinner: NgxSpinnerService, private notifier: NotifierService) {
    this.article = this.formBuilder.group({
      title: ["",[Validators.required]],
      desc: ["Description here...",[Validators.required]],
      article: ["...",[Validators.required]],
      desc_link: ["",],
      articleImg: ["",[Validators.required]]
    })
   }

  ngOnInit(): void {
  }
  public imageChange(e: any){
    let fileReader = new FileReader();
    let file = e.target.files[0]
    this.article.get("articleImg").setValue(file)
    fileReader.addEventListener('load', () => {
      this.imgUrl = fileReader.result
    })
    fileReader.readAsDataURL(file)
  }
  submitArt(e: Event){
    e.preventDefault();
    this.spinner.show()
    var decoded: any = jwt_decode(localStorage.codeama_auth_token)
    let newArt: FormData = new FormData();
    newArt.append("ownerId",decoded._id);
    newArt.append("title", this.article.value.title);
    newArt.append("description", JSON.stringify({
      description: this.article.value.desc + "\r" + this.article.value.article + "\r" + this.article.value.desc_link
    }))
    newArt.append("articlePicture", this.article.value.articleImg)
    this.backendService.addArticle(newArt).subscribe(
      data => {
        this.spinner.hide();
        this.notifier.notify("success","Your article was posted successfully!")
      },
      error => {
        this.spinner.hide();
        console.log(error)
        this.notifier.notify("error","An error occured, please try again!")
      }
    )
  }
}
