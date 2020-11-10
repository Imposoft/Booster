import { Component, OnInit } from '@angular/core';
import {Band} from '../../models/band/band.model';
import {Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {SocialNetworkEnum, SocialNetworks} from '../../models/socialnetworks/socialnetworks.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Genre} from '../../models/genre/genre.model';

@Component({
  selector: 'app-band-modification',
  templateUrl: './band-modification.view.html',
  styleUrls: ['./band-modification.view.sass']
})
export class BandModificationView implements OnInit {

  profile: any;
  bandProfiles;
  printedProfile: any;
  modificationForm: FormGroup;
  path: string;

  private _success = new Subject<string>();
  successMessage = '';
  private nameModification: any; private phoneModification: any;
  private emailModification: any; private imageModification: any;
  private locModification: any; private descModification: any;
  private subsModification: any; private psswModification: any;
  private genreModification: any;
  private instaModification: string; private spotifyModification: string; private twitterModification: string;
  private instaNetwork: any;
  private spotifyNetwork: any;
  private twitterNetwork: any;
  private membersOfBand: any;

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore, private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      if (params.id) {
        console.log(params);
        this.printedProfile = firestore.doc<Band>('bandProfiles/' + params.id);
        this.path = 'bandProfile/' + params.id;
        this.printedProfile.valueChanges().subscribe((band) => {
          console.log(band);
          this.profile = band;
        });
      } else {
        console.log(params);
        this.printedProfile = firestore.doc<Band>('bandProfiles/n6ZhZ1TJI7iayJS4GQrc');
        this.path = 'bandProfile/n6ZhZ1TJI7iayJS4GQrc';
        this.printedProfile.valueChanges().subscribe((band) => {
          this.profile = band;
        });
      }
    });
    // this.profile = this.printedProfile.valueChanges();
  }

  ngOnInit(): void {
    this.profile.subscribe((band) => {
      this.nameModification = band.name;
      this.phoneModification = band.phone;
      this.emailModification = band.email;
      this.psswModification = band.password;
      this.imageModification = band.imageSource;
      this.locModification = band.location;
      this.descModification = band.description;
      this.subsModification = band.subscriptionPrice;
      this.genreModification = band.genres;
      this.membersOfBand = band.members;

      if (band.socialNetworks === undefined) {
        this.instaModification = '';
        this.spotifyModification = '';
        this.twitterModification = '';
      } else {
        if (band.socialNetworks[0].url !== undefined) {
          this.instaModification = band.socialNetworks[0].url;
        }
        if (band.socialNetworks[1].url !== undefined) {
          this.spotifyModification = band.socialNetworks[1].url;
        }
        if (band.socialNetworks[2].url !== undefined) {
          this.twitterModification = band.socialNetworks[2].url;
        }}
    });
    this.modificationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      imageurl: ['', [Validators.required]],
      members: ['', []],
      phone: ['', []],
      location: ['', [Validators.required]],
      urlInsta: ['', []],
      urlSpotify: ['', []],
      urlTwitter: ['', []],
      description: ['', []],
      subscriptionPrice: ['', [Validators.required]],
      genres: ['', [Validators.required]]
    });
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }

  sendForm(): void {
    this.checkValues();
    const band = {
      name: this.nameModification,
      phone: this.phoneModification,
      email: this.emailModification,
      imageSource: this.imageModification,
      location: this.locModification,
      password: this.psswModification,
      members: this.membersOfBand,
      description: this.descModification,
      genres: this.genreModification,
      socialNetworks: this.checkNetworks(),
      subscriptionPrice: this.subsModification
    };
    this.printedProfile.update(band)
      .catch(error => console.log(error));
    this._success.next('Perfil guardado con exito!');
    this.changeView();
  }

  checkValues(): void {
    if (this.modificationForm.value.name !== ''){ this.nameModification = this.modificationForm.value.name; }
    if (this.modificationForm.value.phone !== ''){ this.phoneModification = this.modificationForm.value.phone; }
    if (this.modificationForm.value.email !== ''){ this.emailModification = this.modificationForm.value.email; }
    if (this.modificationForm.value.password !== ''){ this.psswModification = this.modificationForm.value.password; }
    if (this.modificationForm.value.imageurl !== ''){ this.imageModification = this.modificationForm.value.imageurl; }
    if (this.modificationForm.value.location !== ''){ this.locModification = this.modificationForm.value.location; }
    if (this.modificationForm.value.description !== ''){ this.descModification = this.modificationForm.value.description; }
    if (this.modificationForm.value.subscriptionPrice !== ''){ this.subsModification = this.modificationForm.value.subscriptionPrice; }
    if (this.modificationForm.value.genres !== ''){ this.genreModification = this.stringToGenresB(); }
  }

  changeView(): void {
    this.successMessage = '';
    this.router.navigate([this.path]);
  }

  checkNetworks(): SocialNetworks[] {
    if (this.modificationForm.value.urlInsta !== '') {
      this.instaNetwork = { socialNetwork: SocialNetworkEnum.INSTRAGRAM, url: this.modificationForm.value.urlInsta };
    } else {
      this.instaNetwork = { socialNetwork: SocialNetworkEnum.INSTRAGRAM, url: this.instaModification };
    }
    if (this.modificationForm.value.urlSpotify !== '') {
      this.spotifyNetwork = { socialNetwork: SocialNetworkEnum.SPOTIFY, url: this.modificationForm.value.urlSpotify };
    } else {
      this.spotifyNetwork = { socialNetwork: SocialNetworkEnum.SPOTIFY, url: this.spotifyModification };
    }
    if (this.modificationForm.value.urlTwitter !== '') {
      this.twitterNetwork = { socialNetwork: SocialNetworkEnum.TWITTER, url: this.modificationForm.value.urlTwitter };
    } else {
      this.twitterNetwork = { socialNetwork: SocialNetworkEnum.TWITTER, url: this.twitterModification };
    }

    return [this.instaNetwork, this.spotifyNetwork, this.twitterNetwork];
  }

  stringToGenresB(): Genre[]{
    const genreString = this.modificationForm.value.genres;
    return genreString.split(', ');
  }

  genresToString(): string{
    const genres = this.genreModification;
    let result = '';
    for (const genre of genres) {
      result += genre.name + ', ';
    }
    return result;
  }
}
