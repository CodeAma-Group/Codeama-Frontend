import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ChallengeService } from '../services/challenge.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-take-challenge-board',
  templateUrl: './take-challenge-board.component.html',
  styleUrls: ['./take-challenge-board.component.css'],
})
export class TakeChallengeBoardComponent implements OnInit {
  constructor(
    private user: UserService,
    private router: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private challengeService: ChallengeService
  ) {}
  closeResult: string;
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  userData: any = [];
  challenge: any = [];
  codeSandBoxLink: string;
  ngOnInit(): void {
    this.spinner.show();
    this.challengeService
      .getChallenge(this.router.snapshot.params.id)
      .subscribe((res) => {
        this.challenge = res;
        this.codeSandBoxLink = this.challenge.data.codeSandBoxLink;
      });
    this.user.getUserById(this.router.snapshot.params.id).subscribe((res) => {
      this.userData = res;
      this.userData = this.userData.data;
      this.spinner.hide();
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
}
