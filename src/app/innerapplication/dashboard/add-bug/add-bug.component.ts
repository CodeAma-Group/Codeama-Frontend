import { Component, OnInit } from '@angular/core';
import { BugService } from '../../services/bug.service';
import { NotifierService } from 'angular-notifier';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import jwtDecode from 'jwt-decode';
@Component({
  selector: 'app-add-bug',
  templateUrl: './add-bug.component.html',
  styleUrls: ['./add-bug.component.css'],
})
export class AddBugComponent implements OnInit {
  constructor(private bugs: BugService, private notifier:NotifierService) {}
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

  token: any = jwtDecode(localStorage.getItem('codeama_auth_token'));
  userId = this.token._id;
  ngOnInit() {}
  technologies = [
    {
      name: 'vue',
      img: '../../../../assets/test_images/vue.png',
    },
    {
      name: 'angular',
      img: '../../../../assets/test_images/angular.png',
    },
    {
      name: 'c',
      img: '../../../../assets/test_images/c.png',
    },
    {
      name: 'java',
      img: '../../../../assets/test_images/java.png',
    },
    {
      name: 'react',
      img: '../../../../assets/test_images/react.png',
    },
    {
      name: 'js',
      img: '../../../../assets/test_images/js.png',
    },
    {
      name: 'python',
      img: '../../../../assets/test_images/python.png',
    },
    {
      name: 'swift',
      img: '../../../../assets/test_images/swift.png',
    },
  ];
  data;
  submit(form) {
    let bugTitle = form.bugTitle,
      bugDescription = this.htmlContent,
      bugCodes = form.codemirror,
      tagged_tech = form.bugTechnology;
    this.data = {
      userId: this.userId,
      bugs: [
        {
          bug_title: bugTitle,
          bug_description: bugDescription,
          code_snippet: [
            {
              code_block: bugCodes,
            },
          ],
          tagged_technologies: tagged_tech,
        },
      ],
    };

    this.bugs.postBug(this.data).subscribe((res) => {
      try {
        this.notifier.notify("success","Bug posted successfully !")
      } catch (error) {
        alert('an error occured');
      }
    });
  }
}
