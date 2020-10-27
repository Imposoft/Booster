import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Profile, SocialNetwork} from '../../models/profile/profile.model';
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';

@Component({
  selector: 'app-add-social-links',
  templateUrl: './add-social-links.component.html',
  styleUrls: ['./add-social-links.component.sass']
})
export class AddSocialLinksComponent implements OnInit {

  productForm: FormGroup;
  options: Array<SocialNetwork>;
  keys: string[];

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: '',
      quantities: this.fb.array([]) ,
    });

    this.keys = Object.keys(SocialNetworkEnum);
  }

  ngOnInit(): void {
  }

  quantities(): FormArray {
    return this.productForm.get("quantities") as FormArray;
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      qty: '',
      price: '',
    })
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }

  onSubmit() {
    console.log(this.productForm.value);
  }
}
