import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.css'],
})
export class BugDetailsComponent implements OnInit {
  constructor() {}
  htmlContent = '';

  codeMirrorOptions: any = {
    theme: 'default',
    mode: 'application/ld+json',
    lineNumbers: true,
    readOnly:true,
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

  ngOnInit(): void {}
}
