import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SocialNetworkEnum, SocialNetworks} from '../../models/socialnetworks/socialnetworks.model';
import {Profile} from '../../models/profile/profile.model';

@Component({
  selector: 'app-social-adder',
  templateUrl: './social-adder.component.html',
  styleUrls: ['./social-adder.component.sass']
})
export class SocialAdderComponent implements OnChanges {
  @Input() socialNetworks: SocialNetworks[];
  dynamicForm: FormGroup;
  submitted = false;
  numberOfSN: number;
  sne = SocialNetworkEnum;


  constructor(private formBuilder: FormBuilder) { }

  get form(): any { return this.dynamicForm.controls; }
  get networks(): FormArray { return this.form.networks as FormArray; }

  addSocialNetwork(): void {
    this.numberOfSN++;
    if (this.networks.length < this.numberOfSN) {
      this.networks.push(this.formBuilder.group({
        socialNetwork: ['', [Validators.required]],
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

  modifySocialNetworks(): void {
    for (const network of this.networks.value) {
      switch (network.value.socialNetwork) {
        case 'Bandcamp':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.BANDCAMP, url: network.value.url});
          break;
        case 'Facebook':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.FACEBOOK, url: network.value.url});
          break;
        case 'Instagram':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.INSTRAGRAM, url: network.value.url});
          break;
        case 'Drooble':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.DROOBLE, url: network.value.url});
          break;
        case 'TikTok':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.TIKTOK, url: network.value.url});
          break;
        case 'Reverbnation':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.REVERBNATION, url: network.value.url});
          break;
        case 'Soundcloud':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.SOUNDCLOUD, url: network.value.url});
          break;
        case 'Twitter':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.TWITTER, url: network.value.url});
          break;
        case 'Spotify':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.SPOTIFY, url: network.value.url});
          break;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dynamicForm = this.formBuilder.group({
      networks: new FormArray([])
    });
    this.numberOfSN = this.socialNetworks.length;

    if (this.networks.length < this.numberOfSN) {
      for (let i = 0; i < this.numberOfSN; i++) {
        this.networks.push(this.formBuilder.group({
          socialNetwork: this.socialNetworks[i].socialNetwork, // ,
          url: this.socialNetworks[i].url // this.profile.socialNetworks[i].url,
        }));
      }
    }
  }
}
