import { Component, OnInit } from '@angular/core';
import {Tutorial} from '../../models/tutorial/tutorial.model';

@Component({
  selector: 'app-tutorial-listing',
  templateUrl: './tutorial-listing.view.html',
  styleUrls: ['./tutorial-listing.view.sass']
})
export class TutorialListingView implements OnInit {
  classList: Tutorial[];

  singleClass: Tutorial;
  secondClass: Tutorial;
  constructor() {
    this.singleClass = {
      body: 'Cuerpo de la clase',
      description: 'Descripcion de la clase',
      exclusive: false,
      imgUrl: 'assets/class/guitarclass.jpg',
      price: 25,
      promoted: false,
      title: 'Test Titulo',
      userWaitList: [{id: '20', imageurl: 'assets/fan/avatar-man.jpg', name: 'Pablo', contact: '611222333'},
        {id: '30', imageurl: 'assets/fan/avatar-man.jpg', name: 'Pablo2', contact: '611222334'},
        {id: '40', imageurl: 'assets/fan/avatar-man.jpg', name: 'Pablo3', contact: '611222336'}]
    };
    this.secondClass = {
      body: 'Cuerpo de la clase',
      description: 'Descripcion de la clase',
      exclusive: false,
      imgUrl: 'assets/class/guitarclass.jpg',
      price: 25,
      promoted: false,
      title: 'Test Titulo',
      userWaitList: [{id: '20', imageurl: 'assets/fan/avatar-man.jpg', name: 'Pedro', contact: '611222333'},
        {id: '30', imageurl: 'assets/fan/avatar-man.jpg', name: 'Juan', contact: '611222334'},
        {id: '40', imageurl: 'assets/fan/avatar-man.jpg', name: 'Patricio', contact: '611222336'}]
    };
    this.classList = [this.singleClass , this.secondClass];
  }

  ngOnInit(): void {
  }

}
