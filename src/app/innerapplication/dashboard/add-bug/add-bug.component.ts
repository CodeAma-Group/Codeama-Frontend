import { Component, OnInit } from '@angular/core';
import { BugService } from '../../services/bug.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-add-bug',
  templateUrl: './add-bug.component.html',
  styleUrls: ['./add-bug.component.css'],
})
export class AddBugComponent implements OnInit {
  constructor(private bugs: BugService) {}
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
    toolbarHiddenButtons: [['customClasses'], ['strikeThrough']],
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
    theme: 'cobalt',
    mode: 'application/ld+json',
    lineNumbers: true,
    // readOnly:true,
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
  ngOnInit() {}
  data;
  submit(form) {
    let bugTitle = form.bugTitle,
      bugDescription = this.htmlContent,
      bugCodes = form.codemirror;
    console.log(bugCodes);
    this.data = {
      userId: 'someone',
      bugs: [
        {
          bugTitle: bugTitle,
          bugDescription: bugDescription,
          code_snippet: bugCodes,
          date: new Date().toDateString(),
        },
      ],
    };
    this.bugs.postBug(this.data).subscribe((res) => {
      alert(res);
    });
  }
}
