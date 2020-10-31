import { Component, OnInit } from '@angular/core';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {UserDetails} from '../../models/userDetails/user-details.model';

@Component({
  selector: 'app-tutorial-listing',
  templateUrl: './user-tutorial-listing.view.html',
  styleUrls: ['./user-tutorial-listing.view.sass']
})
export class UserTutorialListingView implements OnInit {
  classList: Tutorial[];

  singleClass: Tutorial;
  secondClass: Tutorial;
  tutorialOwner: UserDetails;
  constructor() {
    this.tutorialOwner = {
      contact: '1231231312',
      id: 'asdadsada',
      imageurl: 'assets/fan/avatar-man.jpg',
      name: 'Pepe'
    };
    this.singleClass = {
      body: 'Cuerpo de la clase',
      exclusive: false,
      imgUrl: 'assets/class/guitarclass.jpg',
      price: 25,
      promoted: false,
      title: 'Test Titulo',
      userWaitList: [{id: '20', imageurl: 'assets/fan/avatar-man.jpg', name: 'Pablo', contact: '611222333'},
        {id: '30', imageurl: 'assets/fan/avatar-man.jpg', name: 'Pablo2', contact: '611222334'},
        {id: '40', imageurl: 'assets/fan/avatar-man.jpg', name: 'Pablo3', contact: '611222336'}],
      owner: this.tutorialOwner
    };
    this.secondClass = {
      body: 'Cuerpo de la clase',
      exclusive: false,
      imgUrl: 'assets/class/guitarclass.jpg',
      price: 25,
      promoted: false,
      title: 'Test Titulo',
      userWaitList: [{id: '20', imageurl: 'assets/fan/avatar-man.jpg', name: 'Pedro', contact: '611222333'},
        {id: '30', imageurl: 'assets/fan/avatar-man.jpg', name: 'Juan', contact: '611222334'},
        {id: '40', imageurl: 'assets/fan/avatar-man.jpg', name: 'Patricio', contact: '611222336'}],
      owner: this.tutorialOwner
    };
    this.classList = [this.singleClass , this.secondClass];
  }

  ngOnInit(): void {
  }

  deleteClass(delClass: Tutorial): void {
    for (let i = 0; i < this.classList.length; i++) {
      if (this.classList[i] === delClass){
        this.classList.splice(i, 1);
      }
    }
  }
}
