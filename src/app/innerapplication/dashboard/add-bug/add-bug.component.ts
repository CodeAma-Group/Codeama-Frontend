import { Component, OnInit } from '@angular/core';
import { BugService } from '../../services/bug.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import jwtDecode from 'jwt-decode';
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

  token: any = jwtDecode(localStorage.getItem('codeama_auth_token'));
  userId = this.token._id;
  ngOnInit() {
  }
  data;
  submit(form) {
    let bugTitle = form.bugTitle,
      bugDescription = this.htmlContent,
      bugCodes = form.codemirror;

      // this.data={
      //   userId: "610123aad3e253002243db71",
      //   bugs: [
      //     {
      //       bug_title: "Ibibazo biragwira pe! nge ubu numiwe nimumfashe wllh",
      //       bug_description: "let username = e.target.username.value setUsername(username) biri serie mn naraburje code zambanye inyatsi",
      //       code_snippet: [
      //                   {
      //                  code_block: "let username = e.target.username.value setUsername(username)"
      //        }
      //     ],
      //      tagged_technologies: "React"
      //     }
      //   ]
      // }

      this.data = {
        userId: this.userId,
        bugs: [
          {
            bug_title: bugTitle,
            bug_description: bugDescription,
            code_snippet: [
                        {
                       code_block: bugCodes
             }
          ],
           tagged_technologies: "vue"
          }
        ]
      };
    
    this.bugs.postBug(this.data).subscribe((res) => {
      try {
      alert("posted successfuly")
      console.log(res);
      
      } catch (error) {
        alert("an error occured")
      }  
    });
  }
}
