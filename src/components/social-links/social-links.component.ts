import {Component, Input, OnInit} from '@angular/core';
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
