import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { commentsService } from '../services/comments.service';
import { NotifierService } from 'angular-notifier';
import jwtDecode from 'jwt-decode';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private project: ProjectService,
    private spinner: NgxSpinnerService,
    private ProjectComments: commentsService,
    private notifier: NotifierService
  ) {}
  projectImages = [];
  ProjectImageOnStage: string = '';
  projectData: any;
  projectComments: any ;
  ngOnInit(): void {
    this.spinner.show();
    this.project.getProject(this.router.snapshot.params.id).subscribe((res) => {
      this.projectData = res;
      this.projectData = this.projectData.data;
      for (let i = 0; i < this.projectData.length; i++) {
        this.ProjectImageOnStage = this.projectData[i].demo;
      }
    });
    this.ProjectComments.getProjectComments(
      this.router.snapshot.params.id
    ).subscribe((res) => {
      try {
        this.projectComments = res;
        this.projectComments = this.projectComments.data;
        console.log(this.projectComments);
      } catch (error) {
        this.notifier.notify(
          'error',
          'An error occured while loading project comments'
        );
      }
    });
    this.spinner.hide();
  }
  imageOnStage(data: any) {
    this.ProjectImageOnStage = data.src;
  }
  projectId = this.router.snapshot.params.id;
  comment = '';
  hasSubmitted = false;
  addComment(comment: any) {
    if (comment.comments.trim().length > 10) {
      this.hasSubmitted = true;

      let decoded: any = jwtDecode(localStorage.getItem('codeama_auth_token'));
      let data = {
        content: comment.comments,
        postId: this.projectId,
        commentType: 'Project',
        createdBy: decoded._id,
      };
      this.ProjectComments.commentOnProject(data).subscribe((res) => {
        try {
          this.comment = '';
          this.notifier.notify('success', 'Comment posted successfully');
        } catch (error) {
          this.notifier.notify(
            'error',
            'An error occured while posting the comment'
          );
        }
      });
    } else {
      this.notifier.notify(
        'warning',
        'The comment should contain atleast 10 characters'
      );
    }
  }
}
