import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Genre} from '../../models/genre/genre.model';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';

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

  constructor(private formBuilder: FormBuilder) {
  }

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
  }

  remove(genre: Genre): void {
    const index = this.genreList.indexOf(genre);

    if (index >= 0) {
      this.genreList.splice(index, 1);
    }

    this.genreListModified.emit(this.genreList);
  }

}
