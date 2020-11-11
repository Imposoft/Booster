import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Genre} from '../../models/genre/genre.model';
import {SocialNetworks} from '../../models/socialnetworks/socialnetworks.model';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {MatChipsModule} from '@angular/material/chips';
import {MatChip} from '@angular/material/chips';

@Component({
  selector: 'app-genre-adder',
  templateUrl: './genre-adder.component.html',
  styleUrls: ['./genre-adder.component.sass']
})
export class GenreAdderComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  @Input() genreList: Genre[];
  @Output() genreListModified = new EventEmitter<Genre[]>();
  matChipFrom: FormGroup;
  numberOfG: number;

  constructor(private formBuilder: FormBuilder) {
  }

  get form(): any { return this.matChipFrom.controls; }
  get genres(): FormArray { return this.form.genres as FormArray; }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add genre
    if ((value || '').trim()) {
      this.genreList.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.genreListModified.emit(this.genreList);
    /*if (this.genres.length < this.numberOfG) {
      for (let i = 0; i < this.numberOfG; i++) {
        this.genres.push(this.formBuilder.group({
          name: this.genreList[i].name,
        }));
      }
    }*/
  }

  remove(genre: Genre): void {
    const index = this.genreList.indexOf(genre);

    if (index >= 0) {
      this.genreList.splice(index, 1);
    }

    this.genreListModified.emit(this.genreList);
  }
}
