import {Component, Input, OnInit, SimpleChanges, TemplateRef} from '@angular/core';
import {JobOffer} from '../../models/jobOffer/job-offer.model';
import {Musician} from '../../models/musician/musician.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AngularFirestore} from '@angular/fire/firestore';
import {Fan} from '../../models/fan/fan.model';

@Component({
  selector: 'app-job-offer-checker',
  templateUrl: './job-offer-checker.component.html',
  styleUrls: ['./job-offer-checker.component.sass']
})
export class JobOfferCheckerComponent implements OnInit {
  @Input() jobInput: JobOffer;

  usersShown: boolean;
  closeResult = '';
  public chosenUser: Musician;

  private printedProfile: any;
  public userList: Musician[];
  public firestore: AngularFirestore;

  constructor(private modalService: NgbModal, firestore: AngularFirestore) {
    this.firestore = firestore;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userList = [];
    this.printedProfile = this.firestore.collection<Musician>('musicianProfiles');
    for (let i = 0; i < this.jobInput.userWaitList.length; i++){
      this.printedProfile.doc(this.jobInput.userWaitList[i]).valueChanges().subscribe((musicianToAdd) => {
        this.userList.push(musicianToAdd);
      });
    }
  }

  ngOnInit(): void {
    this.usersShown = false;
  }

  toggleVisible(): void{
    this.usersShown = !this.usersShown;
  }

  deleteUserInfo(user: Musician): void {
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i] === user){
        this.userList.splice(i, 1);
        this.jobInput.userWaitList.splice(i, 1);
        this.firestore.collection<JobOffer>('jobOfferPosts').doc(this.jobInput.id).update(this.jobInput);
      }
    }
  }

  openModal(modal: TemplateRef<any>, userDetails: Musician): void {
    this.chosenUser = userDetails;
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

}
