import { Component, OnInit } from '@angular/core';
import { CodeamaService } from '../services/codeama.service';
import { FollowService } from '../services/follow.service';
import { compare } from 'fast-json-patch';

@Component({
  selector: 'app-codeamas',
  templateUrl: './codeamas.component.html',
  styleUrls: ['./codeamas.component.css']
})
export class CodeamasComponent implements OnInit {

  constructor(private codeama:CodeamaService) { }
  // id=10;
  url="https://codeama-backend.herokuapp.com"
  show:boolean=false
  user;
  badge;
  case;
  codeamaData:any

  originalUser
  follower


  ngOnInit(): void {
    this.codeama.getcodeamas().subscribe((res)=>{
      this.codeamaData=res
      this.codeamaData=this.codeamaData.data
      this.user = this.codeamaData[0].codeama
      console.log(this.user)
      this.show=true
  

    })
  }

  selectfollower(data){
    this.follower = Object.assign({}, data);
    this.originalUser = data;
  }

  onsubmit(){
    const patch = compare(this.originalUser, this.follower);
    console.log("patc" + patch);
  }
    

}
