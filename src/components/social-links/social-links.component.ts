import {Component, Input, OnInit} from '@angular/core';
import {SocialNetwork} from '../../models/profile/profile.model';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.sass']
})
export class SocialLinksComponent implements OnInit {
  @Input() socialNetworks: Map<SocialNetwork, string>;

  constructor() { }

  ngOnInit(): void {
  }

  getKeys(map): Array<SocialNetwork>{
    return Array.from(map.keys());
  }

}
