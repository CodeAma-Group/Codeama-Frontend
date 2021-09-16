import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
      challengeImg: ['',[Validators.required]]
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

  submitChallenge(e: Event) {
    console.log(e)
  }

}
