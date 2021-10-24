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

    var question:FormData;
    question.append("userId", f.form.value.userId);
    question.append("title", f.form.value.title);
    question.append("description", f.form.value.description);
    question.append("askedBy", this.id);
    console.log(question);

    this.codeama.askama(question).subscribe((res) => {
      this.result = res
        this.asking = false;
      f.form.value.questions.text_question = "";
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
