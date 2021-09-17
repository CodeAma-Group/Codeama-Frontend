import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode'


@Component({
  selector: 'app-add-challenge',
  templateUrl: './add-challenge.component.html',
  styleUrls: ['./add-challenge.component.scss']
})
export class AddChallengeComponent implements OnInit {
  challenge;
  public imgUrl
  statuses = ['Pro','Intermediate','Beginner', 'No']
  constructor(private formBuilder: FormBuilder) {
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

  get prizes():FormArray {
    return this.challenge.get('prizes') as FormArray
  }

  submitChallenge(e: Event) {
    e.preventDefault()
    // var decoded: any = jwt_decode(localStorage.codeama_auth_token)
    let newChallenge: FormData = new FormData()

    console.log('prizes',this.prizes.value)

    newChallenge.append('title', this.challenge.value.title)
    newChallenge.append('description', this.challenge.value.description)
    newChallenge.append('picture', this.challenge.value.challengeImg)
    newChallenge.append('prizes', this.challenge.value.prizes)
    newChallenge.append('applicationEndDate', this.challenge.value.applicationEndDate)
    newChallenge.append('endDate', this.challenge.value.endDate)
    newChallenge.append('announceWinnersDate', this.challenge.value.announceWinnersDate)
    newChallenge.append('random', 'this is some text')

    for(var pair of newChallenge.entries()) {
      console.log(pair[0]+ ', '+ pair[1]);
   }
  }



}
