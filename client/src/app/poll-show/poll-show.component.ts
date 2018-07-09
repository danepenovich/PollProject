import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PollService } from '../poll.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Router } from '@angular/router';
import { Poll } from '../poll';
import { OptionService } from '../option.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-poll-show',
  templateUrl: './poll-show.component.html',
  styleUrls: ['./poll-show.component.css']
})
export class PollShowComponent implements OnInit, OnDestroy {
  poll: Poll = new Poll();
  currentUser: User = new User();
  poll_id: string;
  subscription: Subscription

  constructor(
    private _userService: UserService,
    private _pollService: PollService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _optionService: OptionService
  ) { }

  ngOnInit() {
    this._userService.session((res) =>{
      if(res.status === false){
        this._router.navigateByUrl('/');
      }else{
        this.currentUser = res;
      }
    });
    this.subscription = this._route.params.subscribe(params => this.poll_id = params.id);
    this.getPoll();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  getPoll(){
    this._pollService.show(this.poll_id, poll => this.poll = poll);
  }

  update(option_id: string){
    this._optionService.update(option_id, res => this.getPoll());
  }

}
