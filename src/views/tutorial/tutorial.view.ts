import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {debounceTime} from 'rxjs/operators';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {UserDetails} from '../../models/userDetails/user-details.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.view.html',
  styleUrls: ['./tutorial.view.sass']
})
export class TutorialView implements OnInit {
  tutorialPost: Tutorial;
  tutorialOwner: UserDetails;
  fanDetails: UserDetails;



  ButtonVisible = true;

  private _success = new Subject<string>();
  successMessage = '';
  pathId: string;
  private printedProfile: any;

  constructor(private router: Router, private route: ActivatedRoute, private afs: AngularFirestore) {
    this.tutorialPost = {body: '', exclusive: false, imgUrl: '', owner: undefined, price: 0, promoted: false, title: '', userWaitList: []};
    this.route.params.subscribe( params => {
        if (params.id) {
          console.log(params);
          this.printedProfile = afs.doc<Tutorial>('tutorialPosts/' + params.id);
          this.pathId = params.id;
          this.printedProfile.valueChanges().subscribe((tutorial) => {
            console.log(tutorial);
            this.tutorialPost = tutorial;
          });
        } else {
          console.log(params);
          this.printedProfile = afs.doc<Tutorial>('tutorialPosts/IG1rNplbyfMAmuCbTMdJ');
          this.pathId = 'IG1rNplbyfMAmuCbTMdJ';
          this.printedProfile.valueChanges().subscribe(tutorial => {
            this.tutorialPost = tutorial;
          });
        }
      }
    );
  }

  ngOnInit(): void {
    this.tutorialOwner = {
      contact: '1231231312',
      id: 'IfcscpI7GL2pFaZKEccf',
      imageurl: 'https://image.freepik.com/free-vector/woman-avatar-profile-round-icon_24640-14042.jpg',
      name: 'Juan Carlos'
    };

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(2500)
    ).subscribe(() => this.successMessage = '');
  }

  applyForTutorial(): void{
    // TODO Change for logged user
    this.tutorialPost.userWaitList.push(this.tutorialOwner);
    this.printedProfile.update(this.tutorialPost);
    this._success.next('Reserva solicitada con exito! ');
  }
}
