import { Component, OnInit } from '@angular/core';
import { CodeamaService } from '../services/codeama.service';
import jwt_decode from 'jwt-decode';
import { NgForm } from '@angular/forms';
import { AmaQuestionService } from '../services/ama-question.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-askcodeama',
  templateUrl: './askcodeama.component.html',
  styleUrls: ['./askcodeama.component.css']
})
export class AskcodeamaComponent implements OnInit {

  constructor(private codeama: CodeamaService, private amaQuestion: AmaQuestionService, private spinner: NgxSpinnerService) { }

  show: boolean = false
  user;
  badge;
  codeamaData: any
  follower;
  unfollower;
  questions: any = [];
  size: number;
  response: any;
  nu
  auth_token = localStorage.getItem('codeama_auth_token');
  userData: any = jwt_decode(this.auth_token)
  userId: number = this.userData._id
  id:string = this.userData._id
  data
  result
  asked = []
  following: boolean = false
  loading: boolean = false;
  asking:boolean = false;
  question:any;


  ngOnInit(): void {
    this.spinner.show()

    let id = history.state.data;

    this.codeama.getamabyId(id).subscribe((res) => {
      this.user = res
      this.user = this.user.data

      let questionIdUser = this.user.codeama._id

      let k;
      for (k = 0; k < this.user.codeama.Following.length; k++) {
        console.log(this.user.codeama.Following[k]);

        if (this.user.codeama.Following[k] == this.userId) {
          this.following = true;
        }
      }


      this.amaQuestion.getAmaQuestions(questionIdUser).subscribe((res) => {
        this.nu = res
        this.nu = this.nu.data.length

        this.asked.push({ userId: questionIdUser, question: this.nu })

        this.spinner.hide()
      })
    })
  }

  codeMirrorOptions: any = {
    theme: 'cobalt',
    mode: 'application/ld+json',
    lineNumbers: true,
    autocorrect: true,
    smartIndent: true,
    lineWrapping: true,
    readonly: true,
    foldGutter: true,
    gutters: [
      'CodeMirror-linenumbers',
      'CodeMirror-foldgutter',
      'CodeMirror-lint-markers',
    ],
    autoCloseBrackets: true,
    automatically: true,
    matchBrackets: true,
    lint: true,
  };
  askama(f: NgForm) {
    this.asking = true;

    let amaid = history.state.data;

    const formData = {
      userId: f.form.value.userId,
      title: f.form.value.title,
      description: f.form.value.description,
      askedBy: this.id
    }
  
    this.question = Object.create(formData) 
    this.question.userId = f.form.value.userId;
    this.question.title = f.form.value.title;
    this.question.description = f.form.value.description;
    this.question.askedBy = this.id;
    console.log(this.question);
    
    this.codeama.askama(this.question).subscribe((res) => {
         this.result = res
         console.log(this.result);
         this.asking = false;
         f.reset();

        this.codeama.getamabyId(amaid).subscribe((res) => {
          this.following = true;
          this.user = res
          this.user = this.user.data
          this.loading = false;
        })
    })
  }

  schedule() {

  }

  addFollower(id) {
    this.loading = true;
    let amaid = history.state.data;
    this.follower = id
    this.codeama.updateFollower(this.follower).subscribe((res) => {
      this.codeama.getamabyId(amaid).subscribe((res) => {
        this.following = true;
        this.user = res
        this.user = this.user.data
        this.loading = false;
      })
    })
  }

  removeFollower(id) {
    this.loading = true;
    let amaid = history.state.data;
    this.unfollower = id
    this.codeama.updateUnfollower(this.unfollower).subscribe((res) => {
      this.codeama.getamabyId(amaid).subscribe((res) => {
        this.following = false;
        this.user = res
        this.user = this.user.data
        this.loading = false;
      })
    })
  }
}
