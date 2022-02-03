import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import jwt_decode from 'jwt-decode'
import { NgxSpinnerService } from 'ngx-spinner';
import { InnerapplicationService } from '../innerapplication.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  article
  public imgUrl;
  htmlContent = '';


  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Tell your story...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Poppins',
    defaultFontSize: '2',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'Roboto', name: 'Roboto' },
      { class: 'Poppins', name: 'Poppins' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    toolbarHiddenButtons: [
      [
        'italic',
        'strikeThrough',
        'justifyFull',
        'indent',
        'outdent',
        'heading',
      ],
      [
        'textColor',
        'backgroundColor',
        'customClasses',
        'insertHorizontalRule',
        'removecommentContentat',
        'toggleEditorMode',
      ],
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor(private formBuilder: FormBuilder, private backendService: InnerapplicationService, private spinner: NgxSpinnerService, private notifier: NotifierService, private router: Router) {
    this.article = this.formBuilder.group({
      title: ["",[Validators.required]],
      desc: ["Description here...",[Validators.required]],
      article: ["...",[Validators.required]],
      desc_link: ["",],
      articleImg: ["",[Validators.required]]
    })
   }

  ngOnInit(): void {
    this.spinner.show()
    setTimeout(() => {
       this.spinner.hide()
    },1000);
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
        setTimeout(() => this.router.navigate(['app/hood/articles']), 1000)
      },
      error => {
        this.spinner.hide();
        console.log(error)
        console.log(newArt.getAll("ownerId"))
        this.notifier.notify("error","An error occured, please try again!")
      }
    )
  }
}
