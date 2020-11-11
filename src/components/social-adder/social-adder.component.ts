import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
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
  @Output() socialNetworksModified = new EventEmitter<SocialNetworks[]>();

  dynamicForm: FormGroup;
  submitted = false;
  numberOfSN: number;
  sne = SocialNetworkEnum;


  constructor(private formBuilder: FormBuilder) {
  }

  get form(): any { return this.dynamicForm.controls; }
  get networks(): FormArray { return this.form.networks as FormArray; }

  addSocialNetwork(): void {
    this.numberOfSN++;
    if (this.networks.length < this.numberOfSN) {
      this.networks.push(this.formBuilder.group({
        socialNetwork: ['', [Validators.required]],
        url: ['a', [Validators.required]]
      }));
    }
  }

  deleteSocialNetwork(e): void{
    this.numberOfSN--;
    this.networks.removeAt(e);
  }

  modifySocialNetworks(): void {
    for (const network of this.networks.value) {
      switch (network.socialNetwork) {
        case 'BANDCAMP':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.BANDCAMP, url: network.url});
          break;
        case 'FACEBOOK':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.FACEBOOK, url: network.url});
          break;
        case 'INSTAGRAM':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.INSTAGRAM, url: network.url});
          break;
        case 'DROOBLE':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.DROOBLE, url: network.url});
          break;
        case 'TIKTOK':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.TIKTOK, url: network.url});
          break;
        case 'REVERBNATION':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.REVERBNATION, url: network.url});
          break;
        case 'SOUNDCLOUD':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.SOUNDCLOUD, url: network.url});
          break;
        case 'TWITTER':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.TWITTER, url: network.url});
          break;
        case 'SPOTIFY':
          this.socialNetworks.push({socialNetwork: SocialNetworkEnum.SPOTIFY, url: network.url});
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

    this.dynamicForm.valueChanges.subscribe(value => {
        this.socialNetworks = [];
        this.modifySocialNetworks();
        this.socialNetworksModified.emit(this.socialNetworks);
      }
    );
  }
}
