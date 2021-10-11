import { Component, OnInit } from '@angular/core';
import { CodeamaService } from '../services/codeama.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-codeamas',
  templateUrl: './codeamas.component.html',
  styleUrls: ['./codeamas.component.css']
})
export class CodeamasComponent implements OnInit {

  constructor(private codeama:CodeamaService) { }
  url="https://codeama-backend.herokuapp.com"
  show:boolean=false
  badge;
  case;
  codeamaData:any
  unfollower;
  follower
  followButton = `follow`;
  unFollowButton = `unfollow`

  auth_token = localStorage.getItem('codeama_auth_token');
  ngOnInit(): void {
    this.codeama.getcodeamas().subscribe((res)=>{
      
      this.codeamaData=res
      this.codeamaData=this.codeamaData.data 
      
      this.show=true
    })
  }
  userData:any = jwt_decode(this.auth_token)
  userId:number= this.userData._id

  addFollower(id){
    this.follower = id
    this.codeama.updateFollower(this.follower).subscribe((res) => {
      this.codeama.getcodeamas().subscribe((res)=>{
        this.codeamaData=res
        this.codeamaData=this.codeamaData.data 
      })
    })
  }

  removeFollower(id){
    this.unfollower = id
    this.codeama.updateUnfollower(this.unfollower).subscribe((res) => {
        this.codeama.getcodeamas().subscribe((res)=>{
        this.codeamaData=res
        this.codeamaData=this.codeamaData.data 
      })
    })
  }
}
