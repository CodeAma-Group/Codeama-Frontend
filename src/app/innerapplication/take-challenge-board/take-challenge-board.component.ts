import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-take-challenge-board',
  templateUrl: './take-challenge-board.component.html',
  styleUrls: ['./take-challenge-board.component.css'],
})
export class TakeChallengeBoardComponent implements OnInit {
  constructor(
    private user: UserService,
    private router: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}
  userData: any = [];
  ngOnInit(): void {
    this.spinner.show();
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
