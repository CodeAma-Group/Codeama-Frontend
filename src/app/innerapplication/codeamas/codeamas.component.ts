import { Component, OnInit } from '@angular/core';
import { CodeamaService } from '../services/codeama.service';
import jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-codeamas',
  templateUrl: './codeamas.component.html',
  styleUrls: ['./codeamas.component.css']
})
export class CodeamasComponent implements OnInit {

  constructor(private codeama: CodeamaService, private spinner: NgxSpinnerService) { }
  url = "https://codeama-backend.herokuapp.com"
  badge;
  case;
  codeamaData: any
  follow;
  amaInfo: any
  amaId
  found: boolean;
  data: any

  unfollower;
  follower
  followButton = `follow`;
  unFollowButton = `unfollow`
  user: string = '';
  auth_token = localStorage.getItem('codeama_auth_token');
  userData: any = jwt_decode(this.auth_token)
  userId: number = this.userData._id

  ngOnInit(): void {
    this.spinner.show()
    this.codeama.getcodeamas().subscribe((res) => {
      this.codeamaData = res
      this.codeamaData = this.codeamaData.data
      this.found = false;
      this.spinner.hide()

      for (var i = 0; i < this.codeamaData.length; i++) {
        if (this.codeamaData[i].codeama._id == this.userId) {
          this.found = true;
          this.amaId = this.codeamaData[i]._id;
        }
      }
    })
  }

  addFollower(id) {
    this.follow=false
    this.follower = id
    this.codeama.updateFollower(this.follower).subscribe((res) => {
      this.codeama.getcodeamas().subscribe((res) => {
        this.codeamaData = res
        this.codeamaData = this.codeamaData.data
        this.follow=true
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
