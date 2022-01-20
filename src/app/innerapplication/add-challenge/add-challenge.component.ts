import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode'
import { AddChallengeService } from '../services/add-challenge.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ChallengeService } from '../services/challenge.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Data } from '../view-challenges/challenge';


@Component({
  selector: 'app-add-challenge',
  templateUrl: './add-challenge.component.html',
  styleUrls: ['./add-challenge.component.scss']
})
export class AddChallengeComponent implements OnInit {
  challenge;
  challengeData;
  challengeId
  marks: any = []
  prizeStatuses: any = []
  prizeArray: any = [
    {
      marks: 0,
      prize: "Pro Badge"
    },

    {
      marks: 0,
      prize: "Intermediate Badge"
    },

    {
      marks: 0,
      prize: "Beginner Badge"
    },

    {
      marks: 0,
      prize: "No Badge"
    }
  ]
  showErrors: boolean = false
  showPrizeError: boolean = false
  count: number = 0
  public imgUrl
  statuses = ['Pro','Intermediate','Beginner', 'No']
  constructor(private formBuilder: FormBuilder, private challengeService: ChallengeService, private router:ActivatedRoute, private Router:Router) {
    this.challenge = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['',[Validators.required]],
      challengeImg: ['',[Validators.required]],
      prizes: this.formBuilder.array([]),
      applicationEndDate: ['', Validators.required],
      endDate: ['', Validators.required],
      announceWinnersDate: ['', Validators.required],
      codeSandBoxLink: ['', Validators.required]
    })    
   }

  ngOnInit(): void {
  
  }

  public imageChange(e: any){
    let fileReader = new FileReader();
    let file = e.target.files[0]
    this.challenge.get("challengeImg").setValue(file)
    fileReader.addEventListener('load', () => {
      this.imgUrl = fileReader.result
    })
    fileReader.readAsDataURL(file)
  }

  setDate() {
    return new Date(Date.now())
  }

  addMarks(e: Number) {
    this.marks.push(e)
    this.count = this.count+1
    console.warn(this.marks)
  }

  addStatus(e: String) {
    this.prizeStatuses.push(e)
    console.warn(this.prizeStatuses)
  }

  removePrizeItem(e: any) {
    console.log(e)
    this.prizeArray = [...e]
    console.warn(this.prizeArray)
  }

  makePrizeArray() {
    for(let i=0; i<this.marks.length; i++) {
      this.prizeArray[i].marks = this.marks[i]
      this.prizeArray[i].prize = this.prizeStatuses[i]
    }
    console.log('final', this.prizeArray)
    return this.prizeArray
  }

  get prizes():FormArray {
    return this.challenge.get('prizes') as FormArray
  }

  submitChallenge(e: Event) {
    // e.preventDefault()
  //  console.log(this.challenge)
  //  console.log(this.count)
    
    this.showErrors = true
    if(this.marks.length !== 4 && this.count !== 3) {
       this.showPrizeError = true
       this.challenge.status = 'INVALID'
    }else {
      this.showPrizeError = false
    }

    if(this.challenge.status === 'VALID') {
    let newChallenge: FormData = new FormData()

    console.log(JSON.stringify(this.makePrizeArray()))
    newChallenge.append('title', this.challenge.value.title)
    newChallenge.append('description', this.challenge.value.description)
    newChallenge.append('picture', this.challenge.value.challengeImg)
    newChallenge.append('prizes', JSON.stringify(this.makePrizeArray()))
    newChallenge.append('applicationEndDate', this.challenge.value.applicationEndDate)
    newChallenge.append('endDate', this.challenge.value.endDate)
    newChallenge.append('announceWinnersDate', this.challenge.value.announceWinnersDate)
    newChallenge.append('codeSandBoxLink', this.challenge.value.codeSandBoxLink)
    
    for(var pair of newChallenge.entries()) {
      console.log(pair[0]+ ', '+ typeof(pair[1]));
   }

   this.challengeService.postChallenge(newChallenge)
      .subscribe(data=> {
        this.Router.navigate([`app/challenges/613f227d482ca6364cc35760`])
      },error=> {
        console.log(error)
      })
  
  // if(this.challengeData._id) {
  //   this.challengeService.updateChallenge(newChallenge, this.challengeId)
  //   .subscribe(res=> {
  //     console.log(res)
  //   },error=> {
  //     console.log(error)
  //   })
  // }
  }

  }

   



}
