import { Component, OnInit } from '@angular/core';
import { CodeamaService } from '../services/codeama.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-codeamas',
  templateUrl: './codeamas.component.html',
  styleUrls: ['./codeamas.component.css']
})
export class CodeamasComponent implements OnInit {
  constructor(private codeama:CodeamaService) { }
  // id=10;
  url="https://codeama-backend.herokuapp.com"
  user;
  badge;
  case;
  codeamaData:any

  originalUser

  followerName = '';
  followerId = '';

  public follow:FormGroup = new FormGroup({
    followerName: new FormControl('', Validators.required),
    followId: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
      
    this.codeama.getcodeamas().subscribe((res)=>{
      this.codeamaData=res
      this.codeamaData=this.codeamaData.data
      this.user = this.codeamaData.codeama
      console.log(this.follow.value);
    })

    // this.codeama.patch(this.followerId).subscribe((res) => {
    //   console.log("Esther ");
    //   console.log(this.follower)
    //   console.log(res);
    //   console.log(this.firstName.value);
    // })

  }

  onFollow(){
    console.log(this.follow.value);
  }
    
}
