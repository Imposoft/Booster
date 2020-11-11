import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef} from '@angular/core';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {SocialNetworks} from '../../models/socialnetworks/socialnetworks.model';
import {UserDetails} from '../../models/userDetails/user-details.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Profile} from '../../models/profile/profile.model';
import {Band} from '../../models/band/band.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Fan} from '../../models/fan/fan.model';

@Component({
  selector: 'app-class-checker',
  templateUrl: './class-checker.component.html',
  styleUrls: ['./class-checker.component.sass']
})
export class ClassCheckerComponent implements OnInit, OnChanges {
  @Input() classInput: Tutorial;

  usersShown: boolean;
  closeResult = '';
  public chosenUser: Fan;

  private printedProfile: any;
  public userList: Fan[];
  public firestore: AngularFirestore;

  constructor(private modalService: NgbModal, firestore: AngularFirestore) {
    this.firestore = firestore;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userList = [];
    this.printedProfile = this.firestore.collection<Fan>('fanProfiles');
    for (let i = 0; i < this.classInput.userWaitList.length; i++){
      this.printedProfile.doc(this.classInput.userWaitList[i]).valueChanges().subscribe((fanToAdd) => {
        this.userList.push(fanToAdd);
      });
    }
  }

  ngOnInit(): void {
    this.usersShown = false;
  }

  toggleVisible(): void{
    this.usersShown = !this.usersShown;
  }

  deleteUserInfo(user: Fan): void {
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i] === user){
        this.userList.splice(i, 1);
        this.classInput.userWaitList.splice(i, 1);
        this.firestore.collection<Tutorial>('tutorialPosts').doc(this.classInput.id).update(this.classInput);
      }
    }
  }

  openModal(modal: TemplateRef<any>, userDetails: Fan): void {
    this.chosenUser = userDetails;
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
}
