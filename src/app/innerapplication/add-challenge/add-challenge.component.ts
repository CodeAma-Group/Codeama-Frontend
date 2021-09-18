import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode'
import { AddChallengeService } from '../services/add-challenge.service';


@Component({
  selector: 'app-add-challenge',
  templateUrl: './add-challenge.component.html',
  styleUrls: ['./add-challenge.component.scss']
})
export class AddChallengeComponent implements OnInit {
  challenge;
  marks: any = []
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
  constructor(private formBuilder: FormBuilder, private addChallengeService: AddChallengeService) {
    this.challenge = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['',[Validators.required]],
      challengeImg: ['',[Validators.required]],
      prizes: this.formBuilder.array([]),
      applicationEndDate: ['', Validators.required],
      endDate: ['', Validators.required],
      announceWinnersDate: ['', Validators.required]
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

  makePrizeArray() {
    for(let i=0; i<this.marks.length; i++) {
       this.prizeArray[i].marks = this.marks[i]
    }
    return this.prizeArray
  }

  get prizes():FormArray {
    return this.challenge.get('prizes') as FormArray
  }

  submitChallenge(e: Event) {
    // e.preventDefault()
   console.log(this.challenge)
   console.log(this.count)
    
    this.showErrors = true
    if(this.marks.length !== 4 && this.count !== 3) {
       this.showPrizeError = true
       this.challenge.status = 'INVALID'
    }else {
      this.showPrizeError = false
    }

    if(this.challenge.status === 'VALID') {
    let newChallenge: FormData = new FormData()

    console.log(typeof(this.makePrizeArray()))
    console.log(JSON.stringify(this.makePrizeArray()))
    newChallenge.append('title', this.challenge.value.title)
    newChallenge.append('description', this.challenge.value.description)
    newChallenge.append('picture', this.challenge.value.challengeImg)
    newChallenge.append('prizes', JSON.stringify(this.makePrizeArray()))
    newChallenge.append('applicationEndDate', this.challenge.value.applicationEndDate)
    newChallenge.append('endDate', this.challenge.value.endDate)
    newChallenge.append('announceWinnersDate', this.challenge.value.announceWinnersDate)

    for(var pair of newChallenge.entries()) {
      console.log(pair[0]+ ', '+ typeof(pair[1]));
   }

  // console.log(newChallenge.entries())

   this.addChallengeService.postChallenge(newChallenge)
      .subscribe(data=> {
        console.log('submitted')
      },error=> {
        console.log(error)
      })
    
  }

  }



}
