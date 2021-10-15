import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChallengeService } from '../services/challenge.service';
import { Data } from '../view-challenges/challenge';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-challenge',
  templateUrl: './edit-challenge.component.html',
  styleUrls: ['./edit-challenge.component.scss']
})
export class EditChallengeComponent implements OnInit {
  challenge;
  challengeData;
  challengeId;
  isSubmitting: Boolean= false
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
  constructor(private formBuilder: FormBuilder, private challengeService: ChallengeService, private router:ActivatedRoute, private Router: Router, private spinner:NgxSpinnerService) {
    this.challenge = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['',[Validators.required]],
      challengeImg: [''],
      prizes: this.formBuilder.array([]),
      applicationEndDate: ['', Validators.required],
      endDate: ['', Validators.required],
      announceWinnersDate: ['', Validators.required],
      codeSandBoxLink: ['', Validators.required]
    })    
   }

  ngOnInit(): void {
    this.spinner.show()
    if(this.router.snapshot.params.challengeId) {
       this.challengeId = this.router.snapshot.params.challengeId
       this.challengeService.getChallenge(this.challengeId)
       .subscribe((res:Data)=> {
        this.challengeData = res.data
        this.imgUrl = this.challengeData.picture.file
        this.spinner.hide()
        // console.log(this.challengeData.prizes)
     }) 
    }
   
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

  getButtonValue() {
    let value = ''
    if(this.isSubmitting) {
      value='Updating challenge...'
    }else {
      value='Update challenge now'
    }

    return value
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
    this.showErrors = true
    if(this.marks.length !== 4 && this.count !== 3) {
       this.showPrizeError = true
       this.challenge.status = 'INVALID'
    }else {
      this.showPrizeError = false
    }

    console.log(this.challenge)

    if(this.challenge.status === 'VALID' || this.challenge.errors === null) {
      this.isSubmitting = true 
    let newChallenge: FormData = new FormData()

    console.log(JSON.stringify(this.makePrizeArray()))
    newChallenge.append('title', this.challenge.value.title)
    newChallenge.append('description', this.challenge.value.description)
    // newChallenge.append('picture', this.challenge.value.challengeImg)
    newChallenge.append('prizes', JSON.stringify(this.makePrizeArray()))
    newChallenge.append('applicationEndDate', this.challenge.value.applicationEndDate)
    newChallenge.append('endDate', this.challenge.value.endDate)
    newChallenge.append('announceWinnersDate', this.challenge.value.announceWinnersDate)
    newChallenge.append('codeSandBoxLink', this.challenge.value.codeSandBoxLink)
    
    for(var pair of newChallenge.entries()) {
      console.log(pair[0]+ ', '+ typeof(pair[1]));
   }
  
   console.log('there')
    this.challengeService.updateChallenge(newChallenge, this.challengeId)
    .subscribe(res=> {
      this.isSubmitting = false;
      this.Router.navigate([`app/challenges/613f227d482ca6364cc35760`])
    },error=> {
      console.log(error)
    })
  }

  }

   



}
