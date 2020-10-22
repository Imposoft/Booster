import {Component, Input, OnInit} from '@angular/core';
import {SocialNetwork} from '../../models/profile/profile.model';
import {SocialNetworks} from '../../models/socialnetworks/socialnetworks.model';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.sass']
})
export class SocialLinksComponent implements OnInit {
  @Input() socialNetworks: SocialNetworks[];

  constructor() { }

  ngOnInit(): void {
  }

}
