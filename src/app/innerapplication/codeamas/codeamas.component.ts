import { Component, OnInit } from '@angular/core';
import { CodeamaService } from '../services/codeama.service';
import jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { AmaQuestionService } from '../services/ama-question.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-codeamas',
  templateUrl: './codeamas.component.html',
  styleUrls: ['./codeamas.component.css']
})
export class CodeamasComponent implements OnInit {

  constructor(private codeama: CodeamaService, private amaQuestionService: AmaQuestionService, private router: ActivatedRoute, private spinner: NgxSpinnerService) { }
  url = "https://codeama-backend.herokuapp.com"
  badge;
  case;
  codeamaData: any
  follow;
  amaInfo: any
  amaId
  found: boolean;
  data: any
  nu
  answers:any;
  unfollower;
  follower
  followButton = `Follow`;
  unFollowButton = `Unfollow`
  user: string = '';
  auth_token = localStorage.getItem('codeama_auth_token');
  userData: any = jwt_decode(this.auth_token)
  userId: number = this.userData._id
  questions = [];
   loading:boolean;

  ngOnInit(): void {
    this.spinner.show()

    this.codeama.getcodeamas().subscribe((res) => {
      this.codeamaData = res
      this.codeamaData = this.codeamaData.data
      this.found = false;
      for (var i = 0; i < this.codeamaData.length; i++) {
        if (this.codeamaData[i].codeama._id == this.userId) {
          this.found = true;
          this.amaId = this.codeamaData[i]._id;
        }
        let id = this.codeamaData[i].codeama._id
        this.amaQuestionService.getAmaQuestions(id).subscribe((res) => {
          this.nu = res
          this.answers = this.nu.data
          this.nu = this.nu.data.length
          let totalAnswers = 0;
          for(var k=0; k<this.nu; ++k){
            if(this.answers[k].answer != null){
              totalAnswers += 1;
            }
          }
          this.questions.push({ userId: id, question: this.nu, answers: totalAnswers})
          this.spinner.hide()
        })
      }
    })

  }

  addFollower(id) {
    this.loading = true; 
    this.follow = false
    this.follower = id;
    this.codeama.updateFollower(this.follower).subscribe((res) => {
      this.codeama.getcodeamas().subscribe((res) => {
        this.codeamaData = res
        this.codeamaData = this.codeamaData.data
        this.follow = true
        this.loading = false
      })
    })
  }

  removeFollower(id) {
    this.loading= true;
    this.unfollower = id
    this.codeama.updateUnfollower(this.unfollower).subscribe((res) => {
      this.codeama.getcodeamas().subscribe((res) => {
        this.codeamaData = res
        this.codeamaData = this.codeamaData.data
        this.loading = false;
      })
    })
  }


  joinama() {
    this.user = this.userData._id
    const formData = {
      codeama: this.user
    }
    this.data = Object.create(formData)
    this.data.codeama = this.user
    this.codeama.savecodeama(this.data).subscribe((res) => {
      this.codeama.getcodeamas().subscribe((res) => {
        this.codeamaData = res
        this.codeamaData = this.codeamaData.data
      })
    })
    this.found = true
  }


  quitama() {
    this.codeama.removeama(this.amaId).subscribe((res) => {
      this.codeama.getcodeamas().subscribe((res) => {
        this.codeamaData = res
        this.codeamaData = this.codeamaData.data
        
      })
    })
  }

}
