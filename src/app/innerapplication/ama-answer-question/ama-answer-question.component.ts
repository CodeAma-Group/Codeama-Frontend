import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AmaAnswerService } from '../services/ama-answer.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ama-answer-question',
  templateUrl: './ama-answer-question.component.html',
  styleUrls: ['./ama-answer-question.component.css']
})
export class AmaAnswerQuestionComponent implements OnInit {

  questionId;
  info: any;
  answer: any;
  loading:boolean;
  public htmlContent;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Answer this question...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Poppins',
    defaultFontSize: '2',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'Roboto', name: 'Roboto' },
      { class: 'Poppins', name: 'Poppins' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    toolbarHiddenButtons: [
      [
        'italic',
        'strikeThrough',
        'justifyFull',
        'indent',
        'outdent',
        'heading',
        'fontName',
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode',
      ],
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor(private router: Router, private activateRoute: ActivatedRoute, private amaAnswer: AmaAnswerService) { }

  ngOnInit(): void {
    this.questionId = this.activateRoute.snapshot.params["id"];

    this.amaAnswer.questionById(this.questionId).subscribe((res) => {
      this.info = res;
      this.info = this.info.data;
    })

  }

  answerQuestion(f:NgForm) {
    this.loading = true;
    const data = {
        questionId: this.questionId,
        answer: f.form.value.answer
    }
    
    var plainText = f.form.value.answer.replace(/<[^>]*>/g, '');
    console.log(plainText);
    
    this.answer = Object.create(data);
    this.answer.questionId = this.questionId;
    this.answer.answer = plainText;
    
    console.log(this.answer);

    this.amaAnswer.answerQuestion(this.answer).subscribe((res) => {
      this.loading = false;
      console.log(res);
      this.amaAnswer.questionById(this.questionId).subscribe((res) => {
        this.info = res;
        this.info = this.info.data;
      })
    })
    
  }

  checkAnswered() {
    if (this.info.answered) {
      return 'Yes'
    } else {
      return 'No'
    }
  }
}
