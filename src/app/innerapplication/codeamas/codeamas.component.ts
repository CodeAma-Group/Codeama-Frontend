import { Component, OnInit } from '@angular/core';
import { CodeamaService } from '../services/codeama.service';

@Component({
  selector: 'app-codeamas',
  templateUrl: './codeamas.component.html',
  styleUrls: ['./codeamas.component.css']
})
export class CodeamasComponent implements OnInit {

  constructor(private codeama:CodeamaService) { }
  url="https://codeama-backend.herokuapp.com"
  show:boolean=false
  user;
  badge;
  case;
  codeamaData:any

  originalUser
  follower
  followButton = `follow`;

  ngOnInit(): void {
    this.codeama.getcodeamas().subscribe((res)=>{
      console.log(res);
      
      this.codeamaData=res
      this.codeamaData=this.codeamaData.data
      this.user = this.codeamaData.codeama
      console.log(this.codeamaData);
      
      this.show=true
    })
  }

  addFollower(id){
    this.follower = id
    this.codeama.updateFollower(this.follower).subscribe((res) => {
      console.log('following worked');
      this.followButton = `unfollow`
    })
  }
  selectfollower(data){
    this.follower = Object.assign({}, data);
    this.originalUser = data;
  }
}
