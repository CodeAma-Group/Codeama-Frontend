import { Component, OnInit } from '@angular/core';
import { CodeamaService } from '../services/codeama.service';
import jwt_decode from 'jwt-decode';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-askcodeama',
  templateUrl: './askcodeama.component.html',
  styleUrls: ['./askcodeama.component.css']
})
export class AskcodeamaComponent implements OnInit {

  constructor(private codeama: CodeamaService) { }
  // id=10;
  url = "https://codeama-backend.herokuapp.com"
  show: boolean = false
  user;
  badge;
  codeamaData: any
  follower;
  unfollower;
  questions: any = [];
  size: number;
  response: any;

  ngOnInit(): void {
    this.codeama.getcodeamas().subscribe(res => {
      this.response = res
      this.response = this.response.data

      for (let i = 0; i < this.response.length; i++) {
        if (this.response[i]._id == history.state.data) {
          this.user = this.response[i]
          console.log(this.user)
        }
      }
    })
  }
  auth_token = localStorage.getItem('codeama_auth_token');
  userData: any = jwt_decode(this.auth_token)
  userId: number = this.userData._id
  data
  result

  askama(f: NgForm) {

    this.codeama.askama({
      userId: f.form.value.userId,
      questions: [{
        asked_by: this.userId,
        text_question: f.form.value.userId
      }]
    }).subscribe((res) => {
      this.result = res
      console.log(this.result.message)
    })
    console.log(f.form.value)

  }

  schedule() {

  }

  addFollower(id) {
    this.follower = id
    this.codeama.updateFollower(this.follower).subscribe((res) => {
      this.codeama.getcodeamas().subscribe((res) => {
        this.codeamaData = res
        this.codeamaData = this.codeamaData.data
      })
    })
  }

  removeFollower(id) {
    this.unfollower = id
    this.codeama.updateUnfollower(this.unfollower).subscribe((res) => {
      this.codeama.getcodeamas().subscribe((res) => {
        this.codeamaData = res
        this.codeamaData = this.codeamaData.data
      })
    })
  }
}
