import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BugService } from '../../services/bug.service';

@Component({
  selector: 'app-add-bug',
  templateUrl: './add-bug.component.html',
  styleUrls: ['./add-bug.component.css'],
})

export class AddBugComponent implements OnInit {
  constructor(private bugs: BugService) {}
  newBugForm = new FormGroup({
    bugTitle: new FormControl(''),
    bugTechnology: new FormControl(''),
    bugDetails: new FormControl(''),
    bugDescription: new FormControl(),
  });

 codeMirrorOptions: any = {
    theme: 'cobalt',
    mode: 'application/ld+json',
    lineNumbers: true,
    lineWrapping: true,
    // foldGutter: true,
    // gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    // // autoCloseBrackets: true,
    // // automatically:true,
    // matchBrackets: true,
    // lint: true
  };


  obj;

  ngOnInit(){
    this.obj= JSON.stringify({
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "title": "Object",
      "additionalProperties": false,
      "properties": {
        "string": {
          "type": "string",
          "title": "String"
        }
      }
    }, null, ' ');
  }
  setEditorContent(event) {
    // console.log(event, typeof event);
    console.log(this.obj);
  }

  collectData() {
    console.log(this.newBugForm.value);
    this.bugs.postBug(this.newBugForm.value).subscribe((res)=>{
      console.log("data",res);
    })
  }
}
