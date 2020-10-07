import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-component',
  templateUrl: './example-component.component.html',
  styleUrls: ['./example-component.component.sass']
})
export class ExampleComponentComponent implements OnInit {
  model = {
    left: true,
    middle: false,
    right: false
  };

  constructor() { }

  ngOnInit(): void {  }

}
