import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile} from '../../models/profile/profile.model';

@Component({
  selector: 'app-social-adder',
  templateUrl: './social-adder.component.html',
  styleUrls: ['./social-adder.component.sass']
})
export class SocialAdderComponent implements OnInit {
  @Input() profile: Profile;
  dynamicForm: FormGroup;
  submitted = false;
  numberOfSN = 0;

  constructor(private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({
      networks: new FormArray([])
    });
  }

  get form() { return this.dynamicForm.controls; }
  get networks(): FormArray { return this.form.networks as FormArray; }

  addSocialNetwork(): void {
    this.numberOfSN++;
    if (this.networks.length < this.numberOfSN) {
      this.networks.push(this.formBuilder.group({
        socialNetwork: ['', Validators.required],
        url: ['', [Validators.required]]
      }));
    }
  }

  deleteSocialNetwork(e): void{
    this.numberOfSN--;
    this.networks.removeAt(e);
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
    this.networks.clear();
  }

  onClear(): void {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.networks.reset();
  }

}
