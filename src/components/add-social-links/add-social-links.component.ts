import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Profile, SocialNetwork} from '../../models/profile/profile.model';
=======
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
>>>>>>> Stashed changes
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';

@Component({
  selector: 'app-add-social-links',
  templateUrl: './add-social-links.component.html',
  styleUrls: ['./add-social-links.component.sass']
})
export class AddSocialLinksComponent implements OnInit {

  productForm: FormGroup;
<<<<<<< Updated upstream
  options: Array<SocialNetwork>;
=======
>>>>>>> Stashed changes
  keys: string[];

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
<<<<<<< Updated upstream
      name: '',
      quantities: this.fb.array([]) ,
=======
      socialNetworks: this.fb.array([]) ,
>>>>>>> Stashed changes
    });

    this.keys = Object.keys(SocialNetworkEnum);
  }

  ngOnInit(): void {
<<<<<<< Updated upstream
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
=======
    this.keys = Object.keys(SocialNetworkEnum);
    this.productForm = this.fb.group({
      socialNetworks:  ['', []],
      url: ['', []]
    });
  }

  socialLinks(): FormArray {
    return this.productForm.get('socialNetworks') as FormArray;
  }

  newSocialLink(): FormGroup {
    return this.fb.group({
      socialNetwork: '',
      url: '',
    });
  }

  addSocialLink() {
    this.socialLinks().push(this.newSocialLink());
  }

  removeSocialLink(i: number) {
    this.socialLinks().removeAt(i);
>>>>>>> Stashed changes
  }

  onSubmit() {
    console.log(this.productForm.value);
  }
}
