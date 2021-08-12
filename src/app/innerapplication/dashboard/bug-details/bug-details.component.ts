import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BugService } from '../../services/bug.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NotifierService } from 'angular-notifier';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.css'],
})
export class BugDetailsComponent implements OnInit {
  constructor(
    private bug: BugService,
    private router: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService
  ) {}
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
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
        'removecommentContentat',
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

  codeMirrorOptions: any = {
    theme: 'default',
    mode: 'application/ld+json',
    lineNumbers: false,
    readOnly: true,
    autocorrect: true,
    smartIndent: true,
    lineWrapping: true,
    readonly: true,
    foldGutter: true,
    gutters: [
      'CodeMirror-linenumbers',
      'CodeMirror-foldgutter',
      'CodeMirror-lint-markers',
    ],
    autoCloseBrackets: true,
    automatically: true,
    matchBrackets: true,
    lint: true,
  };

  bugId: string;
  bugs: any;
  ngOnInit(): void {
    this.spinner.show();
    this.bug
      .getBug(
        this.router.snapshot.params.id,
        this.router.snapshot.params.posterId
      )
      .subscribe((res) => {
        this.bugs = res;
        this.bugs = this.bugs.data;
        this.spinner.hide();
        this.bugId = this.bugs[0].bug._id;
        console.log(this.bugs);
      });
  }
  checkBadge(badge: string) {
    let className: string = '';
    switch (badge.toLowerCase()) {
      case 'absolute beginner':
        className = 'absBeg';
        break;
      case 'intermediate':
        className = 'interm';
        break;
      case 'pro':
        className = 'pro';
        break;
      default:
        className = 'beginner';
    }
    return className;
  }
  token: any = jwtDecode(localStorage.getItem('codeama_auth_token'));
  userId = this.token._id;
  comment;
  saveComment() {
    console.warn('reaching in function');

    this.comment = {
      bugId: this.bugId,
      userId: this.userId,
      solver: this.userId,
      comment: [
        {
          text_comment: this.htmlContent,
          code_snippet_comment: [{ code_block: 'string' }],
        },
      ],
    };
    this.bug.postComment(this.comment).subscribe((res) => {
      try {
        this.notifier.notify("success","Comment posted successfully")
        console.log(res);
      } catch (error) {
        alert('an error occured');
      }
    });
  }
}
