import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Genre} from '../../models/genre/genre.model';
import {SocialNetworks} from '../../models/socialnetworks/socialnetworks.model';

@Component({
  selector: 'app-genre-adder',
  templateUrl: './genre-adder.component.html',
  styleUrls: ['./genre-adder.component.sass']
})
export class GenreAdderComponent implements OnChanges {
  @Input() genre: any[];
  dynamicForm: FormGroup;
  submitted = false;
  numberOfG: number;

  constructor(private formBuilder: FormBuilder) { }

  get form(): any { return this.dynamicForm.controls; }
  get genres(): FormArray { return this.form.networks as FormArray; }

  addGenre(): void {
      this.numberOfG++;
      if (this.genres.length < this.numberOfG) {
      this.genres.push(this.formBuilder.group({
        genre: ['', [Validators.required]]
      }));
    }
  }

  deleteGenre(e): void{
    this.numberOfG--;
    this.genres.removeAt(e);
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
  }

  onReset(): void {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.genres.clear();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dynamicForm = this.formBuilder.group({
      genres: new FormArray([])
    });
    this.numberOfG = this.genre.length;

    if (this.genres.length < this.numberOfG) {
      for (let i = 0; i < this.numberOfG; i++) {
        this.genres.push(this.formBuilder.group({
          name: this.genre[i].name, // ,
        }));
      }
    }
  }

}
