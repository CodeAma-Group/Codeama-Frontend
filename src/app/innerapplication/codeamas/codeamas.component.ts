import { Component, OnInit } from '@angular/core';
import { CodeamaService } from '../services/codeama.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-codeamas',
  templateUrl: './codeamas.component.html',
  styleUrls: ['./codeamas.component.css']
})
export class CodeamasComponent implements OnInit {

  constructor(private codeama: CodeamaService) { }
  url = "https://codeama-backend.herokuapp.com"
  show: boolean = false
  badge;
  case;
  codeamaData: any
  amaInfo: any
  unfollower;
  follower
  followButton = `follow`;
  unFollowButton = `unfollow`
  user: string = '';
  found: boolean;
  auth_token = localStorage.getItem('codeama_auth_token');
  amaId:string
  skills:any[]
  userData: any = jwt_decode(this.auth_token)
  userId: number = this.userData._id

  ngOnInit(): void {

    this.codeama.getcodeamas().subscribe((res) => {
      this.codeamaData = res
      this.codeamaData = this.codeamaData.data
      this.show = true
      this.found = false;

          
      for (var i = 0; i < this.codeamaData.length; i++) {
        if (this.codeamaData[i].codeama._id == this.userId) {
          this.found = true;
          this.amaId = this.codeamaData[i]._id;
        }
      }
   
      this.codeama.getamabyId(this.amaId).subscribe((res) => {
        this.amaInfo = res
        this.amaInfo = this.amaInfo.data
        this.skills = this.amaInfo.codeama.Skills
        console.log(this.skills);
      })
        
      console.log(this.userId);
      console.log(this.found);
    })
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


  joinama() {
    this.user = this.userData._id
    console.log(this.found)
    let ggg: FormData = new FormData()
    ggg.append("codeama", this.user);
    console.log(ggg.getAll("codeama"))
    
    this.codeama.savecodeama(ggg).subscribe((res) => {
      console.log(res);
    })

  }


  quitama() {
    
    this.codeama.getamabyId(this.amaId).subscribe((res) => {
      this.amaInfo = res
      this.amaInfo = this.amaInfo.data

      console.log(this.amaInfo);
      this.amaId = this.amaInfo._id
      console.log(this.amaId);

      const formData = {
        codeaa: this.amaId 
      }
      
      
    })
  }
}
