import { Component, OnInit } from '@angular/core';
import { NewPoll } from '../new-poll';
import { PollService } from '../poll.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-poll-new',
  templateUrl: './poll-new.component.html',
  styleUrls: ['./poll-new.component.css']
})
export class PollNewComponent implements OnInit {

  newPoll: NewPoll = new NewPoll();
  errors: string[] = [];
  currentUser: User = new User();

  constructor(
    private _pollService: PollService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._userService.session((res) =>{
      if(res.status === false){
        this._router.navigateByUrl('/');
      }else{
        this.currentUser = res;
      }
    });
  }

  createPoll(){
    this._pollService.create(this.newPoll, (poll) => {
      if(poll.errors){
        for(let key of Object.keys(poll.errors)) {
          let error = poll.errors[key];
          this.errors.push(error.message);
        }
      }else{
        this._router.navigateByUrl('/dashboard');
      }
    });
  }

}
