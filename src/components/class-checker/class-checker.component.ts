import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {SocialNetworks} from '../../models/socialnetworks/socialnetworks.model';
import {UserDetails} from '../../models/userDetails/user-details.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-class-checker',
  templateUrl: './class-checker.component.html',
  styleUrls: ['./class-checker.component.sass']
})
export class ClassCheckerComponent implements OnInit {
  @Input() classInput: Tutorial;

  usersShown: boolean;
  classToCheck: Tutorial;
  closeResult = '';
  chosenUser = UserDetails;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usersShown = false;
    this.classToCheck = this.classInput;
  }

  toggleVisible(): void{
    this.usersShown = !this.usersShown;
  }

  deleteUserInfo(user: UserDetails): void {
    for (let i = 0; i < this.classToCheck.userWaitList.length; i++) {
      if (this.classToCheck.userWaitList[i] === user){
        this.classToCheck.userWaitList.splice(i, 1);
      }
    }
  }

  openModal(modal: TemplateRef<any>, userDetails): void {
    this.chosenUser = userDetails;
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });

  }
}
